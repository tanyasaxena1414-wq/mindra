import React, { useState } from 'react';
import type { LifeStage, LanguageCode, TonePreference, CheckInEntry } from './types';
import { INITIAL_SAMPLE_CHECKINS } from './data/sampleTrends';
import { AppShell } from './components/AppShell';
import { Dashboard } from './components/Dashboard';
import { CheckInChat } from './components/CheckInChat';
import { EmotionVectorView } from './components/EmotionVectorView';
import { WellnessTools } from './components/WellnessTools';
import { SafetySupport } from './components/SafetySupport';
import { DesignRationale } from './components/DesignRationale';
import { UrgentHelpModal } from './components/UrgentHelpModal';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [currentLifeStage, setCurrentLifeStage] = useState<LifeStage>('student');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [currentTone, setCurrentTone] = useState<TonePreference>('gentle');
  const [checkIns, setCheckIns] = useState<CheckInEntry[]>(INITIAL_SAMPLE_CHECKINS);
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [isUrgentModalOpen, setIsUrgentModalOpen] = useState<boolean>(false);

  const latestCheckIn = checkIns[0];

  const handleCheckInCompleted = (entry: CheckInEntry) => {
    setCheckIns(prev => [entry, ...prev]);
  };

  const handleResetDemo = () => {
    setCheckIns(INITIAL_SAMPLE_CHECKINS);
    setCurrentLifeStage('student');
    setCurrentLanguage('en');
    setCurrentTone('gentle');
    setActivePrompt('');
    alert('Demo session has been reset to initial state with sample data.');
  };

  const handleStartCheckIn = (prompt?: string) => {
    setActivePrompt(prompt || '');
    setCurrentTab('checkin');
  };

  return (
    <AppShell
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      currentLifeStage={currentLifeStage}
      onChangeLifeStage={setCurrentLifeStage}
      currentLanguage={currentLanguage}
      onChangeLanguage={setCurrentLanguage}
      currentTone={currentTone}
      onChangeTone={setCurrentTone}
      onResetDemo={handleResetDemo}
      onOpenUrgentHelp={() => setIsUrgentModalOpen(true)}
    >
      {currentTab === 'dashboard' && (
        <Dashboard
          currentLifeStage={currentLifeStage}
          currentLanguage={currentLanguage}
          onChangeLifeStage={setCurrentLifeStage}
          latestCheckIn={latestCheckIn}
          onStartCheckIn={handleStartCheckIn}
          onOpenInsights={() => setCurrentTab('insights')}
          onOpenWellness={() => setCurrentTab('wellness')}
        />
      )}

      {currentTab === 'checkin' && (
        <CheckInChat
          currentLifeStage={currentLifeStage}
          currentLanguage={currentLanguage}
          currentTone={currentTone}
          onCheckInCompleted={handleCheckInCompleted}
          onOpenWellness={() => setCurrentTab('wellness')}
          onOpenSupport={() => setCurrentTab('support')}
          initialPrompt={activePrompt}
        />
      )}

      {currentTab === 'insights' && (
        <EmotionVectorView
          checkIns={checkIns}
          currentLifeStage={currentLifeStage}
        />
      )}

      {currentTab === 'wellness' && (
        <WellnessTools currentLanguage={currentLanguage} />
      )}

      {currentTab === 'support' && (
        <SafetySupport
          currentLanguage={currentLanguage}
          onOpenWellness={() => setCurrentTab('wellness')}
        />
      )}

      {currentTab === 'design-rationale' && (
        <DesignRationale />
      )}

      <UrgentHelpModal
        isOpen={isUrgentModalOpen}
        onClose={() => setIsUrgentModalOpen(false)}
        currentLanguage={currentLanguage}
      />
    </AppShell>
  );
};

export default App;
