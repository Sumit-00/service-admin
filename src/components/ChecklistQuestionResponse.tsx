import { ChecklistQuestionResponseProps } from '@/app/audit/types';
import { QuestionResponseType } from '@/constants/enums';
import FormMultiSelect from './FormMultiSelect';
import FormRadio from './FormRadio';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';

export function ChecklistQuestionResponse({
  questionText,
  type,
  required = false,
  has_remarks = false,
  is_photo_required = false,
  options = [],
  category_index,
  index,
  readOnly = false,
}: ChecklistQuestionResponseProps & {
  category_index: number;
  index: number;
  readOnly?: boolean;
}) {
  const getQuestionResponseType = () => {
    switch (type) {
      case QuestionResponseType.FREE_TEXT:
        return (
          <FormTextArea
            name={`category.${category_index}.questions.${index}.response_text`}
            label={questionText}
            required={required}
            rows={10}
            disabled={readOnly}
          />
        );
      case QuestionResponseType.RADIO:
        return (
          <FormRadio
            name={`category.${category_index}.questions.${index}.response_text`}
            label={questionText}
            options={options}
            required={required}
            className="border-blue-lightest"
            disabled={readOnly}
          />
        );
      case QuestionResponseType.DROPDOWN:
        return (
          <FormSelect
            name={`category.${category_index}.questions.${index}.response_text`}
            label={questionText}
            required={required}
            options={options}
            disabled={readOnly}
            selectValue={{
              placeholder: 'Select score',
            }}
          />
        );
      case QuestionResponseType.MULTI_SELECT:
        return (
          <FormMultiSelect
            name={`category.${category_index}.questions.${index}.response_text`}
            label={questionText}
            required={required}
            options={options}
            disabled={readOnly}
            placeholder=""
            onValueChange={() => {}}
          />
        );
      default:
        return (
          <FormTextArea
            name={`category.${category_index}.questions.${index}.response_text`}
            label={questionText}
            required={required}
            disabled={readOnly}
            rows={10}
          />
        );
    }
  };

  return (
    <div>
      <div className="bg-blue-lightest mb-1 rounded border p-4">
        {getQuestionResponseType()}
        {has_remarks && (
          <div className="pl-4 pt-4 font-normal">
            <FormTextArea
              label={'Remarks'}
              name={`category.${category_index}.questions.${index}.remarks`}
              disabled={readOnly}
            />
          </div>
        )}
        {is_photo_required && (
          <div className="pl-4 pt-4 font-normal">
            <FormTextArea
              label={'Photo'}
              name={`category.${category_index}.questions.${index}.image_url_key`}
              disabled={readOnly}
            />
          </div>
        )}
      </div>
    </div>
  );
}
