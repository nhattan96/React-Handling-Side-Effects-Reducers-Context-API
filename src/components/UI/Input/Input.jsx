import React, { useRef, useImperativeHandle, useEffect } from 'react'

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    useEffect(() =>{
        inputRef.current.focus()
    },[])

    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
            test: test
        }
    })

    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor="email">{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
})

export default Input