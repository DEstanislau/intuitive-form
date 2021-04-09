import React, { useEffect, useRef, useState, useCallback } from 'react';

import InputMask from 'react-input-mask';

import { FiAlertCircle } from 'react-icons/fi';
import { BsCheckCircle } from 'react-icons/bs';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

const Input = ({ name, icon: Icon, customMask, ...rest }) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [checked, setChecked] = useState(false);

  const {
    fieldName,
    defaultValue,
    error,
    registerField,
    clearError,
  } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    clearError();
    setIsFilled(!!inputRef.current.value);
  }, [clearError]);

  const onChangeText = useCallback(() => {
    setChecked(!!inputRef.current.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue() {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon color={error && 'red'} size={20} />}

      {customMask ? (
        <InputMask
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          onChange={onChangeText}
          autoComplete="on"
          ref={inputRef}
          {...rest}
        />
      ) : (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          onChange={onChangeText}
          autoComplete="on"
          ref={inputRef}
          {...rest}
        />
      )}

      {checked && !error && (
        <div className="container-check">
          <BsCheckCircle color="green" size={20} />
        </div>
      )}

      {error && (
        <Error disappear={isFilled && !error} title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
