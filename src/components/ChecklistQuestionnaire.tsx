import { ChecklistQuestionnaireProps } from '@/app/audit/types';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChecklistQuestionResponse } from './ChecklistQuestionResponse';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function ChecklistQuestionnaire({
  categories,
  readOnly = false,
}: ChecklistQuestionnaireProps) {
  const [openAccordion, setOpenAccordion] = useState<string>();

  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (errors) {
      const errorsArray: Array<number> = [];
      const categoriesErrors = errors.category;
      if (Array.isArray(categoriesErrors)) {
        categoriesErrors.map((error, categoryIndex) => {
          if (error) {
            if (error?.questions?.length) {
              errorsArray.push(categoryIndex);
            }
          }
          return;
        });

        if (errorsArray.length) {
          setOpenAccordion(`category-accordion-${errorsArray[0]}`);
        }
      }
    }
  }, [errors]);

  return (
    <Accordion
      className="w-full"
      type="single"
      collapsible
      value={openAccordion}
      onValueChange={setOpenAccordion}
    >
      {Object.entries(categories).map(([categoryName, questions], categoryIndex) => (
        <AccordionItem
          value={`category-accordion-${categoryIndex}`}
          key={`category-accordion-${categoryIndex}`}
          className="border-black border-l-1 mb-1 border-b-0"
        >
          <AccordionTrigger className={'bg-blue px-4'}>{categoryName}</AccordionTrigger>
          <AccordionContent className={'rounded'}>
            {questions.map((question, index) => (
              <ChecklistQuestionResponse
                key={index}
                questionText={question.questionText}
                type={question.type}
                required={question.required}
                has_remarks={question.has_remarks}
                is_photo_required={question.is_photo_required}
                options={question.options}
                category_index={categoryIndex}
                index={index}
                readOnly={readOnly}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
