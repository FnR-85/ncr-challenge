import { createRef, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ModelProvider } from './controls/fields/model-context';

// props: model, onSubmit
export default function Form(props) {
  const methods = useForm({ defaultValues: props.model });
  const [model] = useState(props.model);
  const formRef = createRef();

  useEffect(() => {
    formRef.current.getElementsByClassName('field')[0].focus();
  });

  const onSubmit = (event) => {
    if (props.model) {
      Object.assign(props.model, model);
    }
    methods.handleSubmit(props.onSubmit)();
    event.preventDefault();
  };

  return (
    <ModelProvider model={model}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} ref={formRef}>
          {props.children}
        </form>
      </FormProvider>
    </ModelProvider>
  );
}
