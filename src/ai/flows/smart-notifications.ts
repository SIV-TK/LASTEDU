'use server';

/**
 * @fileOverview Smart Notifications AI Flow
 * Generates personalized, context-aware notifications to enhance learning engagement
 *
 * - generateSmartNotifications - Main function for generating intelligent notifications
 * - SmartNotificationsInput - Input interface for the notification system
 * - SmartNotificationsOutput - Output interface with notification recommendations
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const RecentActivitySchema = z.object({
  action: z.string().describe('Type of activity (study, exam, quiz, etc.)'),
  subject: z.string().describe('Subject involved in the activity'),
  timestamp: z.string().describe('When the activity occurred'),
  duration: z.number().describe('Duration in minutes'),
  performance: z.number().optional().describe('Performance score (0-100)')
});

const DeadlineSchema = z.object({
  title: z.string().describe('Title of the deadline item'),
  subject: z.string().describe('Subject related to the deadline'),
  dueDate: z.string().describe('Due date in ISO format'),
  priority: z.enum(['low', 'medium', 'high']).describe('Priority level'),
  completed: z.boolean().describe('Whether the task is completed')
});

const PerformanceMetricsSchema = z.object({
  overallGrade: z.number().describe('Overall grade percentage'),
  subjectScores: z.record(z.string(), z.number()).describe('Scores by subject'),
  learningStreak: z.number().describe('Days of continuous learning'),
  strugglingSubjects: z.array(z.string()).describe('Subjects where student is struggling'),
  improvingSubjects: z.array(z.string()).describe('Subjects showing improvement')
});

const SmartNotificationsInputSchema = z.object({
  studentActivity: z.array(RecentActivitySchema).describe('Recent student learning activities'),
  upcomingDeadlines: z.array(DeadlineSchema).describe('Upcoming assignments and exams'),
  performanceData: PerformanceMetricsSchema.describe('Student performance metrics'),
  timeOfDay: z.string().describe('Current time in ISO format'),
  currentStreak: z.number().optional().describe('Current learning streak in days')
});

export type SmartNotificationsInput = z.infer<typeof SmartNotificationsInputSchema>;

// Output Schema
const NotificationSchema = z.object({
  id: z.string().describe('Unique identifier for the notification'),
  type: z.enum(['reminder', 'encouragement', 'warning', 'celebration', 'suggestion']).describe('Type of notification'),
  title: z.string().describe('Notification title'),
  message: z.string().describe('Notification message content'),
  priority: z.enum(['low', 'medium', 'high']).describe('Priority level'),
  actionButton: z.string().optional().describe('Text for action button'),
  actionUrl: z.string().optional().describe('URL for action button'),
  icon: z.string().optional().describe('Icon name for the notification'),
  scheduledTime: z.string().optional().describe('When to show the notification')
});

const ReminderScheduleSchema = z.object({
  dailyReminder: z.boolean().describe('Whether to send daily study reminders'),
  reminderTime: z.string().describe('Preferred time for reminders (HH:MM format)'),
  weeklyGoalCheck: z.boolean().describe('Whether to send weekly goal check reminders'),
  examAlerts: z.boolean().describe('Whether to send exam preparation alerts')
});

const SmartNotificationsOutputSchema = z.object({
  notifications: z.array(NotificationSchema).describe('Array of personalized notifications'),
  urgencyLevel: z.enum(['low', 'medium', 'high']).describe('Overall urgency level'),
  personalizedMessage: z.string().describe('Personal message for the student'),
  actionItems: z.array(z.string()).describe('Recommended action items'),
  reminderSchedule: ReminderScheduleSchema.describe('Personalized reminder schedule')
});

export type SmartNotificationsOutput = z.infer<typeof SmartNotificationsOutputSchema>;

export async function generateSmartNotifications(input: SmartNotificationsInput): Promise<SmartNotificationsOutput> {
  return smartNotificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartNotificationsPrompt',
  input: { schema: SmartNotificationsInputSchema },
  output: { schema: SmartNotificationsOutputSchema },
  model: 'deepseek/deepseek-chat',
  prompt: `You are an AI learning assistant that generates personalized, timely notifications to help students stay engaged and motivated in their learning journey.

  **Student Context:**
  - **Recent Activity:** 
    {{#each studentActivity}}
    - {{action}} in {{subject}} on {{timestamp}} ({{duration}} min){{#if performance}} - Score: {{performance}}%{{/if}}
    {{/each}}

  - **Upcoming Deadlines:**
    {{#each upcomingDeadlines}}
    - {{title}} ({{subject}}) - Due: {{dueDate}} - Priority: {{priority}}{{#if completed}} ✓{{/if}}
    {{/each}}

  - **Performance Overview:**
    - Overall Grade: {{performanceData.overallGrade}}%
    - Learning Streak: {{performanceData.learningStreak}} days
    - Struggling Subjects: {{#each performanceData.strugglingSubjects}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
    - Improving Subjects: {{#each performanceData.improvingSubjects}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

  - **Current Time:** {{timeOfDay}}
  {{#if currentStreak}}
  - **Learning Streak:** {{currentStreak}} days
  {{/if}}

  **Instructions:**
  1. **Generate 3-5 personalized notifications** based on the student's context
  2. **Vary notification types:** Include reminders, encouragement, warnings, celebrations, and suggestions
  3. **Consider timing:** Factor in the time of day and upcoming deadlines
  4. **Be motivational:** Use positive, encouraging language while being helpful
  5. **Include actionable items:** Provide specific next steps the student can take
  6. **Personalize messages:** Reference specific subjects, performance, and activities

  **Notification Guidelines:**
  - **Reminders:** For upcoming deadlines, missed study sessions, or routine check-ins
  - **Encouragement:** For maintaining streaks, good performance, or when struggling
  - **Warnings:** For at-risk performance, missed deadlines, or concerning patterns
  - **Celebrations:** For achievements, improvements, or milestones
  - **Suggestions:** For study strategies, resource recommendations, or new opportunities

  **Tone:** Supportive, encouraging, and motivational while being informative and actionable.

  Generate comprehensive notification recommendations now.`,
});

const smartNotificationsFlow = ai.defineFlow(
  {
    name: 'smartNotificationsFlow',
    inputSchema: SmartNotificationsInputSchema,
    outputSchema: SmartNotificationsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      const result = output || {};
      
      return result as SmartNotificationsOutput;
    } catch (error) {
      console.error('Error generating smart notifications:', error);
      
      // Fallback notifications
      return {
        notifications: [
          {
            id: 'fallback-1',
            type: 'reminder' as const,
            title: 'Study Session Reminder',
            message: 'It\'s time for your daily study session. Keep up the great work!',
            priority: 'medium' as const,
            actionButton: 'Start Studying',
            actionUrl: '/subjects/my-subjects',
            icon: 'BookOpen'
          }
        ],
        urgencyLevel: 'medium' as const,
        personalizedMessage: 'Keep up the excellent work! Your dedication to learning is inspiring.',
        actionItems: ['Review today\'s lessons', 'Complete pending assignments', 'Take a practice quiz'],
        reminderSchedule: {
          dailyReminder: true,
          reminderTime: '19:00',
          weeklyGoalCheck: true,
          examAlerts: true
        }
      };
    }
  }
);
