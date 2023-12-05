import {Formik} from 'formik';

export default function FormikBase({initialValues,validationSchema,onSubmit,children,...props}){
	return(
		<Formik
			initialValues={ initialValues }
			validationSchema={ validationSchema }
			enableReinitialize={ true }
			validateOnChange={ true }
			validateOnBlur={ true }
			onSubmit={ onSubmit }
			{ ...props }>
			{ props=>children({...props}) }
		</Formik>
	);
}