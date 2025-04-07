// Mock Supabase Client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: null,
      error: null
    })
  }
}));

// Globale Konfiguration für Tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn()
};
