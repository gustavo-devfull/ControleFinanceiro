import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dtcnghkhlqllvlpprdeh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Y25naGtobHFsbHZscHByZGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDM4MjMsImV4cCI6MjA2NDQ3OTgyM30.Cr2LFl2FqGDi2AIb6LzwR-wuBUYLNSW33ePciC1Bm2I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);