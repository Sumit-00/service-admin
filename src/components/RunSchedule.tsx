import { useSaveResponses } from '@/app/audit/run/hooks/useSaveResponses';
import { useUpdateSummaryStatus } from '@/app/audit/run/hooks/useUpdateSummaryStatus';
import {
  getRunScheduleSchema,
  getSaveQuestionnaireResponses,
} from '@/app/audit/run/play/[id]/form';
import { ROUTES } from '@/constants/enums';
import router from 'next/router';
import { DefaultValues, FieldValues } from 'react-hook-form';
import FormWrapper from './FormWrapper';
import { FormFieldTypeMapping, RenderGridFormItemProps } from './RenderFormItem';

interface RunScheduleProps {
  config: Array<RenderGridFormItemProps<keyof FormFieldTypeMapping>>;
  defaultValues: DefaultValues<FieldValues>;
  readOnly?: boolean;
}

export default function RunSchedule({ config, defaultValues, readOnly = false }: RunScheduleProps) {
  const { saveChecklistQuestionnaireResponses } = useSaveResponses();
  const { updateSummaryStatusById } = useUpdateSummaryStatus();
  return (
    <FormWrapper
      config={config}
      defaultValues={defaultValues}
      schema={getRunScheduleSchema()}
      onSubmit={(data: any) => {
        const responseBody = getSaveQuestionnaireResponses(data);
        saveChecklistQuestionnaireResponses(responseBody).then((response) => {
          if (response.success) {
            updateSummaryStatusById({ summaryId: responseBody.summaryId, status: 'COMPLETE' }).then(
              () => router.push(ROUTES.RunAudit),
            );
          }
        });
      }}
      onCancel={() => {
        console.log('onCancel');
      }}
      footer={readOnly ? null : undefined}
    />
  );
}
