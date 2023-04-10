import { useState, useEffect } from 'react'
import { StyledAnswer } from './Answer-style';
import { StyledButton } from './Button-style'
import { StyledProgressButtonHolder } from './ProgressButtonHolder-style'
import { StyledInnerCard } from './InnerCard-style'
import { StyledContainer } from './Container-style'
import { StyledButtonHolder } from './ButtonHolder-style.js'
import { saveResponse } from '../integration.ts'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ContentCard = ({data, numberQuestions, userId, surveyId, restartFunction}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [allRequiredAnswered, setAllRequiredAnswered] = useState(false)
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(0)
    const validationDict = {
        "SHORT_ANSWER" : Yup.string()
            .max(50, "Must be 50 characters or less."),
        "LONG_ANSWER" : Yup.string()
            .max(1000, "Must be 10000 characters or less."),
    }

    let valueDict = {}
    for (let i = 0; i<numberQuestions; i++) {valueDict[i] = ""}

    let schema = {}
    for (let i = 0; i < numberQuestions; i++) {schema[i] = validationDict[data[i].questionType]}

    const formik = useFormik({
        initialValues : valueDict,
        validationSchema : Yup.object().shape(schema),
    })

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    
    useEffect(() => {
        let bool = false;
        let err = false;
        let answers = formik.values
        if (Object.values(answers).length>0) {bool = true;}
        for (let i = 0; i < Object.values(answers).length; i++) {
            if ((Object.values(answers)[i] === "") && (data[i].isRequired)) {
                bool = false
            }
            err = err || (formik.errors[currentQuestion] ? true : false)
        }
        setAllRequiredAnswered(bool)
        setError(err)
    }, [formik.values, data, updated,currentQuestion,formik.errors])



    const handleSubmit = (formik, restartFunction) => {
        let answers = Object.values(formik.values)
        for (let i = 0; i < answers.length; i++) {
            if (typeof answers[i] == "object") {
                answers[i] = answers[i].join("")
            }
        }
        console.log("submitted")
        saveResponse(surveyId, userId, answers)
        surveyId = null
        restartFunction(true)
    }

    const getButtonsUsingForLoop = (numberQuestions) => {
        const array = []
        for(var i = 0; i < numberQuestions; i++){
          let a = i;
          array.push(
            <StyledButton width={"auto"}
                onClick={()=>{
                    setCurrentQuestion(a);
                }}
                key={i}
                error = {formik.errors[a] ? 0.5 : 1}
                >Q{i+1}
            </StyledButton>)
        }
        return array
    }

    return (
        <div>
            {!surveyId ? (
                <p><center>You have no incomplete surveys!</center></p>
            ) : (
            <>
                    <StyledContainer>
                        <StyledInnerCard width={"100%"} maxwidth={"80px"} height={"fit-content"} justify={"center"}>
                            {getButtonsUsingForLoop(numberQuestions)}
                        </StyledInnerCard>
                        <StyledInnerCard height="fit-content">
                            <h2 id='question-text'>{String(currentQuestion + 1) + '. ' + data[currentQuestion].questionTitle}</h2>
                            <StyledAnswer type={data[currentQuestion].questionType} options={data[currentQuestion].selections} qNum={currentQuestion} formik = {formik} updated = {updated} updater = {setUpdated}></StyledAnswer>
                            {formik.errors[currentQuestion] ? <p>{formik.errors[currentQuestion]}</p> : null}
                            <StyledProgressButtonHolder>
                                <StyledButton right={"9px"} width={"80px"}
                                    onClick={() => {
                                        setCurrentQuestion(Math.max(0, currentQuestion - 1));
                                    } }
                                >Previous</StyledButton>
                                <StyledButton right={"9px"} width={"80px"}
                                    onClick={() => {
                                        setCurrentQuestion(Math.min(numberQuestions - 1, currentQuestion + 1));
                                    } }
                                >Next</StyledButton>
                            </StyledProgressButtonHolder>
                            <StyledButtonHolder>
                                {allRequiredAnswered && !error && isEmpty(formik.errors) &&
                                    <StyledButton right={"9px"} width={"80px"}
                                    onClick={() => {
                                        handleSubmit(formik, restartFunction)
                                    } }>Submit</StyledButton>
                                }  
                            </StyledButtonHolder>
                        </StyledInnerCard>  
                                          
                    </StyledContainer>
                                     
            </>
            )}
        </div>
        
     );
}

export default ContentCard;
