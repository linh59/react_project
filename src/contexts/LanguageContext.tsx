
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.listening': 'Listening',
    'nav.writing': 'Writing',
    'nav.conversation': 'Conversation',
    'nav.grammar': 'Grammar',
    'nav.notebook': 'Notebook',
    'nav.components': 'Components',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.account': 'Account',
    
    // Greetings
    'greeting.morning': 'Good Morning!',
    'greeting.afternoon': 'Good Afternoon!',
    'greeting.evening': 'Good Evening!',
    'greeting.night': 'Good Night!',
    'greeting.morning.message': 'Ready to start your English adventure?',
    'greeting.afternoon.message': 'Time for some English practice!',
    'greeting.evening.message': 'Let\'s continue learning together!',
    'greeting.night.message': 'Time for a quiet study session or some rest!',
    
    // Dashboard
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.dayStreak': 'Day Streak',
    'dashboard.wordsLearned': 'Words Learned',
    'dashboard.lessonsCompleted': 'Lessons Completed',
    
    // Quick Actions
    'quickActions.listening.title': 'Listening',
    'quickActions.listening.description': 'Practice with YouTube videos',
    'quickActions.writing.title': 'Writing',
    'quickActions.writing.description': 'Improve your writing skills',
    'quickActions.conversation.title': 'Conversation',
    'quickActions.conversation.description': 'Practice speaking skills',
    'quickActions.notebook.title': 'Notebook',
    'quickActions.notebook.description': 'Review saved words',
    'quickActions.grammar.title': 'Grammar',
    'quickActions.grammar.description': 'Learn grammar rules',
    'quickActions.components.title': 'Components',
    'quickActions.components.description': 'UI Kit reference',
    
    // Common
    'common.viewProfile': 'View Profile',
    'common.language': 'Language',
    'common.english': 'English',
    'common.vietnamese': 'Vietnamese',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.listening': 'Nghe',
    'nav.writing': 'Viết',
    'nav.conversation': 'Hội thoại',
    'nav.grammar': 'Ngữ pháp',
    'nav.notebook': 'Sổ tay',
    'nav.components': 'Thành phần',
    'nav.profile': 'Hồ sơ',
    'nav.settings': 'Cài đặt',
    'nav.account': 'Tài khoản',
    
    // Greetings
    'greeting.morning': 'Chào buổi sáng!',
    'greeting.afternoon': 'Chào buổi chiều!',
    'greeting.evening': 'Chào buổi tối!',
    'greeting.night': 'Chúc ngủ ngon!',
    'greeting.morning.message': 'Sẵn sàng bắt đầu cuộc phiêu lưu tiếng Anh?',
    'greeting.afternoon.message': 'Đã đến lúc thực hành tiếng Anh!',
    'greeting.evening.message': 'Hãy tiếp tục học cùng nhau!',
    'greeting.night.message': 'Thời gian cho một buổi học yên tĩnh hoặc nghỉ ngơi!',
    
    // Dashboard
    'dashboard.quickActions': 'Hành động nhanh',
    'dashboard.dayStreak': 'Ngày liên tiếp',
    'dashboard.wordsLearned': 'Từ đã học',
    'dashboard.lessonsCompleted': 'Bài học hoàn thành',
    
    // Quick Actions
    'quickActions.listening.title': 'Nghe',
    'quickActions.listening.description': 'Thực hành với video YouTube',
    'quickActions.writing.title': 'Viết',
    'quickActions.writing.description': 'Cải thiện kỹ năng viết',
    'quickActions.conversation.title': 'Hội thoại',
    'quickActions.conversation.description': 'Thực hành kỹ năng nói',
    'quickActions.notebook.title': 'Sổ tay',
    'quickActions.notebook.description': 'Xem lại từ đã lưu',
    'quickActions.grammar.title': 'Ngữ pháp',
    'quickActions.grammar.description': 'Học các quy tắc ngữ pháp',
    'quickActions.components.title': 'Thành phần',
    'quickActions.components.description': 'Tham khảo bộ công cụ UI',
    
    // Common
    'common.viewProfile': 'Xem hồ sơ',
    'common.language': 'Ngôn ngữ',
    'common.english': 'Tiếng Anh',
    'common.vietnamese': 'Tiếng Việt',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'vi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
