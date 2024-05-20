'use client'

import { passwordStrength } from "check-password-strength";
import styles from './complexityBar.module.scss';
import {useMemo, useState } from "react";

type ComplexityBar = {
    password?: string;
    isValid: boolean;
    setValidation:(value: boolean) => void;
}

export default function ComplexityBar(props: ComplexityBar){

    const [comStyle, setComStyle] = useState('');

    useMemo(
      () => {
        if(props.password){
            const passStrength =  passwordStrength(props.password)
            const passForca = passStrength.value
            .toLowerCase().split(' ').join('');
            setComStyle(passForca);

            if(passStrength.value === "Strong"){
                props.setValidation(true)
            }else{
                props.setValidation(false)
            }

        }
      },
      [props.password],
    );


    return (<div>
                <p>Password Strength</p>
                <div className={styles.default}>
                    <div className={
                        styles[`${comStyle}`]
                    }>
                    </div>
                </div>
                {props.isValid === false && <p> It has to be Strong</p>}
            </div>
    );
}
