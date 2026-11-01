/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { speechEngine } from './utils/speechEngine';
import { readingLessons } from './data/readingLessonsData';
import { literaryTexts } from './data/literaryTextsData';
import { grammarLessons } from './data/grammarLessonsData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './components/HomeScreen';
import { ReadingLessonView } from './components/ReadingLessonView';
import { LiteraryTextView } from './components/LiteraryTextView';
import { GrammarLessonView } from './components/GrammarLessonView';
import { ListeningView } from './components/ListeningView';
import { SpellingView } from './components/SpellingView';
import { FinalReviewView } from './components/FinalReviewView';
import { CoverageAuditView } from './components/CoverageAuditView';
import { CompanionMascot } from './components/CompanionMascot';

export default function App() {
  // Start on the fun, stylish Home Screen with cartoon mascot "فصيح"
  const [currentCategory, setCurrentCategory] = useState<string>('home');
  const [currentLessonId, setCurrentLessonId] = useState<string>('reading-october');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('arabic_grade8_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Total lessons: 6 reading + 3 literature + 6 grammar = 15 core lessons
  const totalLessons = readingLessons.length + literaryTexts.length + grammarLessons.length;

  useEffect(() => {
    try {
      localStorage.setItem('arabic_grade8_completed_lessons', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }, [completedLessonIds]);

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleSelectLesson = (category: string, id?: string) => {
    speechEngine.stop();
    setCurrentCategory(category);
    if (id) {
      setCurrentLessonId(id);
    } else {
      // Pick sensible defaults if not provided
      if (category === 'reading') setCurrentLessonId(readingLessons[0].id);
      else if (category === 'literature') setCurrentLessonId(literaryTexts[0].id);
      else if (category === 'grammar') setCurrentLessonId(grammarLessons[0].id);
      else if (category === 'listening') setCurrentLessonId('listening-amna');
      else if (category === 'spelling') setCurrentLessonId('spelling-hamza');
      else if (category === 'final_review') setCurrentLessonId('review');
      else if (category === 'audit') setCurrentLessonId('audit');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active items
  const currentReading = readingLessons.find((l) => l.id === currentLessonId) || readingLessons[0];
  const currentLit = literaryTexts.find((l) => l.id === currentLessonId) || literaryTexts[0];
  const currentGrammar = grammarLessons.find((l) => l.id === currentLessonId) || grammarLessons[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" dir="rtl">
      {/* Top Navigation Bar */}
      <Navbar
        completedCount={completedLessonIds.length}
        totalLessons={totalLessons}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onGoHome={() => handleSelectLesson('home', 'home')}
        onOpenAudit={() => handleSelectLesson('audit', 'audit')}
        onOpenReview={() => handleSelectLesson('final_review', 'review')}
      />

      {/* Main Body */}
      {currentCategory === 'home' ? (
        // Full-width stylish Home Screen with Mascot & 4 Gateway Cards
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HomeScreen
            onNavigate={(category, lessonId) => handleSelectLesson(category, lessonId)}
            completedLessonIds={completedLessonIds}
          />
        </div>
      ) : (
        // Lesson View with Sidebar & Floating Companion
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8 items-start">
          {/* Navigation Sidebar */}
          <Sidebar
            currentCategory={currentCategory}
            currentLessonId={currentLessonId}
            completedLessonIds={completedLessonIds}
            onSelectLesson={handleSelectLesson}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Dynamic Main Lesson Content */}
          <main className="flex-1 min-w-0">
            {currentCategory === 'reading' && (
              <ReadingLessonView
                lesson={currentReading}
                isCompleted={completedLessonIds.includes(currentReading.id)}
                onToggleComplete={handleToggleComplete}
              />
            )}

            {currentCategory === 'literature' && (
              <LiteraryTextView
                text={currentLit}
                isCompleted={completedLessonIds.includes(currentLit.id)}
                onToggleComplete={handleToggleComplete}
              />
            )}

            {currentCategory === 'grammar' && (
              <GrammarLessonView
                lesson={currentGrammar}
                isCompleted={completedLessonIds.includes(currentGrammar.id)}
                onToggleComplete={handleToggleComplete}
              />
            )}

            {currentCategory === 'listening' && <ListeningView />}

            {currentCategory === 'spelling' && <SpellingView />}

            {currentCategory === 'final_review' && <FinalReviewView />}

            {currentCategory === 'audit' && <CoverageAuditView />}
          </main>

          {/* Floating Companion Mascot in Lesson Views to encourage student */}
          <CompanionMascot
            mode="floating"
            customSpeech={`أنا معك يا بطل! ركز جيداً في هذا الدرس، وأنا مستعد لتشجيعك عند كل إجابة صحيحة!`}
          />
        </div>
      )}
    </div>
  );
}
