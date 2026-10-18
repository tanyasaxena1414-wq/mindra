import type { PersonaProfile } from '../types';

export const PERSONAS: Record<string, PersonaProfile> = {
  student: {
    id: 'student',
    name: 'Aarav (Student)',
    ageRange: '13 – 22 years',
    tagline: 'Academic pressure, exam anxiety, peer expectations & self-discovery',
    avatarIcon: 'GraduationCap',
    typicalContext: 'Balancing board exams/college assignments, competitive rankings, and social comparison on digital media.',
    coreStressors: ['Fear of academic failure', 'Family expectations', 'Sleep deprivation', 'Imposter syndrome among peers'],
    preferredTone: 'gentle',
    samplePrompts: [
      'I have an exam tomorrow and I feel completely paralyzed by anxiety.',
      'Everyone else in my batch seems to understand the concepts except me.',
      'I cannot focus on studying for more than five minutes today.',
      'My parents have high expectations and I dread disappointing them.'
    ]
  },
  young_adult: {
    id: 'young_adult',
    name: 'Priya (Young Professional)',
    ageRange: '23 – 30 years',
    tagline: 'Early career hurdles, financial independence & relationship transitions',
    avatarIcon: 'Briefcase',
    typicalContext: 'Navigating first job pressures, rent and savings worries, and the emotional toll of constant hyper-productivity.',
    coreStressors: ['Burnout from long working hours', 'Quarter-life uncertainty', 'Dating & relationship friction', 'Workplace imposter syndrome'],
    preferredTone: 'empowering',
    samplePrompts: [
      'My manager gave harsh feedback and I am questioning my entire career choice.',
      'I feel exhausted every weekend and dread opening my work laptop on Monday.',
      'I am falling behind compared to where my peers are financially and socially.',
      'I have so many decisions to make and my mind is in endless analysis paralysis.'
    ]
  },
  working_adult: {
    id: 'working_adult',
    name: 'Rajesh (Working Parent / Mid-Career)',
    ageRange: '31 – 45 years',
    tagline: 'Dual caregiving, intense workplace responsibility & personal fatigue',
    avatarIcon: 'Building2',
    typicalContext: 'Managing team deliverables at work while handling school runs, mortgage payments, and shrinking personal time.',
    coreStressors: ['Chronic fatigue & time deficit', 'Sandwich caregiving pressures', 'Loss of personal identity outside roles', 'Workplace restructuring stress'],
    preferredTone: 'grounding',
    samplePrompts: [
      'I have zero time for myself between work deadlines and household responsibilities.',
      'I snapped at my family after a long day at the office and feel awful about it.',
      'My workload keeps compounding but I cannot afford to pause or drop any balls.',
      'I feel emotionally numb and just running through daily checklists on autopilot.'
    ]
  },
  middle_aged: {
    id: 'middle_aged',
    name: 'Sunita (Mid-Life Transition)',
    ageRange: '46 – 60 years',
    tagline: 'Aging parents, empty nest transitions, career peaks & health reflections',
    avatarIcon: 'HeartHandshake',
    typicalContext: 'Managing elderly parent health checkups, children leaving home for higher studies, and bodily changes.',
    coreStressors: ['Empty nest loneliness', 'Elderly parent caregiving strain', 'Health vulnerabilities', 'Searching for renewed purpose'],
    preferredTone: 'reflective',
    samplePrompts: [
      'The house feels unusually quiet now that the kids have moved out for college.',
      'Balancing my elderly mother’s hospital visits with my daily routine is draining.',
      'I find myself reflecting on past choices and feeling anxious about growing older.',
      'I want to rediscover what brings me personal peace and joy.'
    ]
  },
  senior: {
    id: 'senior',
    name: 'Col. Sharma (Retd. Senior)',
    ageRange: '60+ years',
    tagline: 'Retirement routine shift, social isolation, physical health & bereavement',
    avatarIcon: 'Smile',
    typicalContext: 'Coping with loss of daily workplace community, reduced mobility, and seeking meaningful connection and dignity.',
    coreStressors: ['Feelings of reduced utility or relevance', 'Physical discomfort & health limits', 'Social isolation and quiet days', 'Grief over lost contemporaries'],
    preferredTone: 'gentle',
    samplePrompts: [
      'Days feel very long since retirement and I miss having purposeful work.',
      'My knees keep hurting and it frustrates me that I cannot walk like I used to.',
      'Most of my old colleagues have moved away and evenings feel quite lonely.',
      'I just wanted a calm, patient space to share what is on my mind today.'
    ]
  }
};
