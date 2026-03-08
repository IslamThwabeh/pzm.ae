import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STATIC_WEEKDAY_TEXT = [
  'Sunday: 10:00 AM - 01:00 AM',
  'Monday: 10:00 AM - 11:00 PM',
  'Tuesday: 10:00 AM - 10:30 PM',
  'Wednesday: 10:00 AM - 11:00 PM',
  'Thursday: 10:00 AM - 11:00 PM',
  'Friday: 10:00 AM - 11:00 PM',
  'Saturday: 10:00 AM - 12:00 AM',
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Static-only response to avoid external API dependency and runtime fetch errors.
    const data = {
      result: {
        opening_hours: {
          open_now: null,
          weekday_text: STATIC_WEEKDAY_TEXT,
        },
      },
      source: 'static',
    };

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});