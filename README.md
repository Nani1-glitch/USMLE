# 🏥 USMLE AI Tutor

A world-class, end-to-end USMLE preparation web application featuring an intelligent AI tutor and personal knowledge base system.

## ✨ Features

### 🤖 AI Medical Tutor
- **OpenAI GPT-4o-mini Integration**: Advanced AI-powered medical tutoring
- **Personalized Learning**: Tailored explanations and clinical reasoning
- **Real-time Chat**: Instant responses to medical questions
- **USMLE Focus**: Specialized for Step 1 and Step 2 CK preparation

### 📚 Personal Notes Repository
- **Local Storage**: Secure, private note management
- **Text Processing**: Smart chunking and organization
- **Search Functionality**: Quick access to saved content
- **Individual Note Management**: Granular control over your knowledge base

### 🎨 Premium Medical UI/UX
- **Modern Design**: Clean, professional medical interface
- **Responsive Layout**: Flawless mobile and desktop experience
- **Smooth Animations**: Engaging transitions and interactions
- **Medical Theme**: Professional gradient design with medical elements

### 📱 Mobile-First Design
- **Perfect Mobile Experience**: Optimized for all screen sizes
- **Touch-Friendly**: Intuitive mobile navigation
- **Cross-Device Compatibility**: Seamless experience across devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/usmle-ai.git
   cd usmle-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini, text-embedding-3-large
- **Storage**: Local JSON files
- **Deployment**: GitHub Pages

## 📖 Usage

### AI Tutor
1. Navigate to the **Chat** section
2. Ask any medical question related to USMLE topics
3. Receive detailed, educational explanations
4. Use the AI for clinical reasoning practice

### Knowledge Base
1. Go to the **Knowledge Base** section
2. Add your personal notes and study materials
3. Organize content by topics
4. Search and retrieve information quickly

## 🎯 Educational Focus

### USMLE Step 1
- Basic Sciences: Anatomy, Physiology, Biochemistry
- Pathology, Pharmacology, Microbiology
- Clinical vignettes and integrated concepts

### USMLE Step 2 CK
- Clinical Knowledge: Internal Medicine, Surgery
- Pediatrics, Obstetrics & Gynecology, Psychiatry
- Diagnosis, management, and patient care

## ⚠️ Important Notice

**This application is for educational purposes only.** It is not intended to provide medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
usmle-ai/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── chat/           # Chat tutor page
│   │   ├── uploads/        # Knowledge base page
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   └── lib/               # Utility functions
├── data/                   # Local data storage
├── .github/workflows/      # GitHub Actions
└── public/                # Static assets
```

## 🚀 Deployment

This application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Medical education community for inspiration

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ for medical students pursuing excellence in USMLE preparation.**