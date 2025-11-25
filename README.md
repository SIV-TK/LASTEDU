# EdTech AI Hub

A comprehensive, AI-powered educational platform designed to enhance learning experiences for students and educators. Built with modern technology and powered by advanced AI capabilities for personalized education.

## 🎯 Core Capabilities

### 📚 **Student Learning Hub**
- **Interactive Dashboard**: Centralized view of subjects, progress, and personalized recommendations
- **Subject Management**: Enroll in and manage multiple subjects with dedicated pages for each
- **AI Progress Insights**: Real-time analysis of learning progress with personalized feedback
- **Smart Notifications**: Context-aware reminders and motivational messages based on activity
- **Learning Streaks**: Track and maintain daily learning habits with gamification

### 🤖 **AI-Powered Features**
- **AI Study Tips**: Subject-specific, personalized study recommendations
- **AI Tutor Chat**: Interactive Q&A with intelligent responses for any subject
- **AI Notes Generator**: Create comprehensive class notes from any topic
- **AI Notes Summarizer**: Condense existing notes into key points
- **Personalized Learning Paths**: Custom study plans based on performance and goals
- **AI Question Generator**: Create practice tests and quizzes on specific topics
- **Smart Recommendations**: AI-curated learning resources and materials

### 📊 **Progress & Analytics**
- **Visual Progress Tracking**: Charts showing performance trends across subjects
- **Performance Analytics**: Detailed insights into strengths and improvement areas
- **Learning Activity Monitoring**: Track study sessions, time spent, and engagement
- **Goal Setting & Tracking**: Set and monitor academic objectives
- **Comparative Analysis**: Subject-to-subject performance comparison

### 📖 **Content & Resources**
- **Digital Library**: Access to textbooks, reference materials, and story books
- **Exam Library**: Browse and analyze past exams with AI explanations
- **Resource Recommendations**: AI-suggested articles, videos, and tutorials
- **Curriculum Support**: Materials for CBE, 8-4-4, and IGCSE systems
- **Multi-language Support**: Content in English and Kiswahili

### 👨🏫 **Educator Tools**
- **Lesson Plan Generator**: AI-powered creation of detailed lesson plans
- **Scheme of Work Creator**: Comprehensive curriculum planning assistance
- **Class Presentation Generator**: Interactive slides and materials
- **Student Progress Monitoring**: Track individual and class performance
- **Assessment Tools**: Create and grade assignments with AI assistance

### 🎮 **Engagement Features**
- **Leaderboards**: Competitive rankings to motivate learning
- **Achievement Badges**: Recognition for milestones and consistent effort
- **Learning Contests**: Participate in academic competitions
- **Social Learning**: Connect with peers and study groups
- **Digital Diary**: Plan activities with AI-powered scheduling advice

### 🔐 **User Management**
- **Multi-role Authentication**: Students, teachers, and admin access levels
- **Profile Customization**: Personalized learning preferences and settings
- **Curriculum Selection**: Choose between different educational systems
- **Session Management**: Secure login with timeout protection
- **Privacy Controls**: Comprehensive data protection and user privacy

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **UI Library**: [ShadCN UI](https://ui.shadcn.com/) components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive design
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Charts**: [Recharts](https://recharts.org/) for data visualization
- **Icons**: [Lucide React](https://lucide.dev/) icon library

### **Backend & AI**
- **AI Framework**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **AI Provider**: [Deepseek API](https://platform.deepseek.com/) for advanced language models
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Hosting**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

### **Development Tools**
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git
- **Deployment**: Firebase CLI

## 🤖 AI Engine Overview

Powered by **Deepseek AI** through Google Genkit framework:

### **Learning Intelligence**
- **Progress Analysis**: Real-time performance insights with personalized feedback
- **Study Optimization**: AI-generated study tips tailored to individual subjects
- **Learning Path Creation**: Custom study schedules based on goals and performance
- **Smart Notifications**: Context-aware reminders and motivational messages

### **Content Generation**
- **Notes Creation**: Generate comprehensive class notes from any topic
- **Notes Summarization**: Condense lengthy materials into key points
- **Question Generation**: Create practice tests and quizzes automatically
- **Lesson Planning**: AI-assisted curriculum and lesson plan development

### **Interactive Support**
- **AI Tutoring**: Conversational Q&A for instant subject help
- **Resource Recommendations**: Curated learning materials and references
- **Exam Analysis**: Detailed breakdown of exam structures and topics
- **Performance Coaching**: Personalized advice for academic improvement

### **Advanced Features**
- **Multi-language Support**: English and Kiswahili content generation
- **Curriculum Adaptation**: Support for CBE, 8-4-4, and IGCSE systems
- **Error Handling**: Robust fallbacks ensure continuous service
- **Real-time Processing**: Instant AI responses for seamless user experience

## 🚀 Quick Start

### **Live Demo**
🌐 **Production App**: [https://last-35eb7.web.app](https://last-35eb7.web.app)

### **Demo Accounts**
- **Student**: `student@demo.com` / `password123`
- **Teacher**: `teacher@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

### **Local Development**

#### Prerequisites
- Node.js 18+
- Firebase CLI
- Git

#### Installation
```bash
# Clone repository
git clone <repository-url>
cd LASTEDU

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your API keys
```

#### Required Environment Variables
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# AI Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key
```

#### Development Servers
```bash
# Terminal 1: Next.js frontend
npm run dev

# Terminal 2: Genkit AI backend
npm run genkit:watch
```

#### Access Points
- **Frontend**: http://localhost:3000
- **Genkit UI**: http://localhost:4000

## 🚀 Deployment

### **Production Deployment**

#### Quick Deploy
```bash
# Automated deployment
./deploy.sh

# Manual deployment
npm run build
firebase deploy --only hosting
```

#### Firebase Setup
1. Create Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Configure authorized domains

#### Environment Configuration
```bash
# Set production environment variables
firebase functions:config:set deepseek.api_key="your_key"
firebase functions:config:set firebase.config="your_config"
```

#### Deployment Checklist
- [ ] Firebase project configured
- [ ] Environment variables set
- [ ] Authentication providers enabled
- [ ] Firestore rules configured
- [ ] Domain authorization complete
- [ ] SSL certificate active

### **Monitoring & Maintenance**
- **Performance**: Firebase Performance Monitoring
- **Analytics**: Built-in usage tracking
- **Error Tracking**: Comprehensive error logging
- **API Usage**: Deepseek API consumption monitoring

## 📁 Architecture Overview

### **Frontend Structure**
```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Student dashboard
│   ├── subjects/          # Subject management
│   ├── progress/          # Analytics & tracking
│   ├── auth/              # Authentication flows
│   └── admin/             # Administrative tools
├── components/            # Reusable UI components
│   ├── ui/                # ShadCN base components
│   ├── auth/              # Authentication components
│   └── learning/          # Educational components
├── lib/                   # Core utilities
│   ├── actions.ts         # Server actions
│   ├── auth.ts            # Authentication logic
│   └── firebase.ts        # Firebase configuration
└── hooks/                 # Custom React hooks
```

### **AI Backend Structure**
```
src/ai/
├── genkit.ts              # AI framework configuration
├── flows/                 # AI processing flows
│   ├── generate-progress-insights.ts
│   ├── smart-notifications.ts
│   ├── generate-study-tips.ts
│   └── [other AI flows]
└── middleware/            # AI processing middleware
```

### **Key Components**
- **Authentication**: Multi-role Firebase Auth with session management
- **AI Engine**: Deepseek-powered intelligent features
- **Data Layer**: Firestore with optimized queries
- **UI Framework**: ShadCN components with Tailwind styling
- **State Management**: React hooks with context providers

## 🔧 System Status & Support

### **Current Status**
✅ **Production Ready** - All core features operational
✅ **AI Features** - Deepseek integration fully functional
✅ **Authentication** - Firebase Auth with multi-role support
✅ **Database** - Firestore with optimized performance
⚠️ **Google Sign-in** - Temporarily disabled (email/password available)

### **Performance Metrics**
- **AI Response Time**: < 3 seconds average
- **Page Load Speed**: < 2 seconds
- **Uptime**: 99.9% availability
- **Mobile Responsive**: Full compatibility

### **Troubleshooting**

#### AI Features Not Working
1. Check Deepseek API key in environment variables
2. Verify both development servers are running
3. Test AI flows in Genkit UI (http://localhost:4000)
4. Check browser console for error messages

#### Authentication Issues
1. Verify Firebase configuration
2. Check authorized domains in Firebase Console
3. Clear browser cache and cookies
4. Try demo accounts for testing

#### Performance Issues
1. Check network connectivity
2. Monitor Firebase usage quotas
3. Verify API rate limits
4. Review browser developer tools

### **Support Resources**
- **Documentation**: Comprehensive guides included
- **Demo Environment**: Full-featured testing available
- **Error Handling**: Graceful fallbacks implemented
- **Monitoring**: Real-time system health tracking

## 🎓 Educational Impact

### **Learning Outcomes**
- **Personalized Education**: AI adapts to individual learning styles and pace
- **Improved Engagement**: Gamification and interactive features boost motivation
- **Data-Driven Insights**: Analytics help identify strengths and areas for improvement
- **Accessibility**: Multi-language and multi-curriculum support
- **Scalable Learning**: Supports individual students to entire institutions

### **Supported Curricula**
- **CBE (Competency-Based Education)**: Modern skills-focused approach
- **8-4-4 System**: Traditional Kenyan education structure
- **IGCSE**: International General Certificate of Secondary Education

### **Subject Coverage**
- **Core Subjects**: Mathematics, English, Kiswahili, Sciences
- **Humanities**: History, Geography, Social Studies
- **Creative Arts**: Art, Music, Creative Writing
- **Life Skills**: Home Science, Physical Education

## 🌟 Future Roadmap

### **Planned Features**
- **Video Conferencing**: Live classes and tutoring sessions
- **Advanced Analytics**: Predictive learning outcomes
- **Mobile App**: Native iOS and Android applications
- **Offline Mode**: Download content for offline study
- **Parent Portal**: Progress monitoring for guardians
- **Certification**: Digital badges and certificates

### **AI Enhancements**
- **Voice Interaction**: Speech-to-text and text-to-speech
- **Image Recognition**: Solve problems from photos
- **Adaptive Testing**: Dynamic difficulty adjustment
- **Emotional Intelligence**: Mood-aware learning recommendations

---

**Built with ❤️ for the future of education**

*Empowering learners, enabling educators, transforming education through AI.*