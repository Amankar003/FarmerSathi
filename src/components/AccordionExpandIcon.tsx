"use client";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function AccordionExpandIcon() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: "panel1",
      question: "Do I need a soil report to use crop prediction?",
      answer: "Yes, a soil report is required to use the crop prediction feature. The AI analyzes the soil's nutrient levels (N, P, K), pH, and other properties to suggest the best crops for your land."
    },
    {
      id: "panel2",
      question: "How do I upload my soil report?",
      answer: "You can manually enter the values from your soil report in the Krishi Lab section under 'Crop Yield Prediction'. We are also working on a feature to upload PDF reports directly."
    },
    {
      id: "panel3",
      question: "What if the system shows the wrong disease?",
      answer: "While our AI is highly accurate, environmental factors in images can sometimes cause errors. If you suspect an incorrect diagnosis, you can retake the image in better lighting or consult agricultural experts."
    },
    {
      id: "panel4",
      question: "Can I chat in my regional language?",
      answer: "Yes! AgriBot is designed to understand and respond in Hindi, making it easier for Indian farmers to communicate naturally. We are expanding to other regional languages soon."
    },
    {
      id: "panel5",
      question: "How accurate is the disease detection system?",
      answer: "The AI-powered disease detection system uses advanced Plant.id API and has a high accuracy rate based on extensive training with diverse crop disease datasets."
    }
  ];

  return (
    <div className='flex flex-col w-[100%] max-w-4xl mx-auto gap-[1.5rem] px-4'>
      {faqs.map((faq) => (
        <Accordion 
          key={faq.id}
          expanded={expanded === faq.id} 
          onChange={handleChange(faq.id)}
          sx={{ 
            backgroundColor: 'rgba(11, 26, 16, 0.6)', 
            backdropFilter: 'blur(10px)',
            color: 'white', 
            borderRadius: '1.2rem !important',
            border: '1px solid rgba(82, 183, 136, 0.2)',
            boxShadow: expanded === faq.id ? '0 8px 30px rgba(82, 183, 136, 0.15)' : 'none',
            '&:before': { display: 'none' },
            transition: 'all 0.3s ease'
          }}
        >
          <AccordionSummary
            expandIcon={
                expanded === faq.id 
                ? <RemoveIcon sx={{ color: '#E9C46A', fontSize: 28 }} /> 
                : <AddIcon sx={{ color: '#52B788', fontSize: 28 }} />
            }
            aria-controls={`${faq.id}-content`}
            id={`${faq.id}-header`}
            sx={{
                padding: '1rem 2rem',
                '& .MuiAccordionSummary-content': { margin: '1rem 0' }
            }}
          >
            <Typography sx={{ 
                fontSize: '1.6rem', 
                fontWeight: expanded === faq.id ? 600 : 500,
                color: expanded === faq.id ? '#F0F7F4' : '#A8C5B5',
                fontFamily: "'Inter', sans-serif"
            }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0 2rem 2rem 2rem' }}>
            <Typography sx={{ 
                fontSize: '1.4rem', 
                color: '#6B9080', 
                lineHeight: 1.7,
                fontFamily: "'Inter', sans-serif"
            }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}