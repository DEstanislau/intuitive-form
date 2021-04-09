import React, { useCallback, useRef, useState } from 'react';

import {
  FiUser,
  FiMail,
  FiSmartphone,
  FiTrello,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { MdLocationCity } from 'react-icons/md';
import { GiDoubleStreetLights, GiHomeGarage } from 'react-icons/gi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { FaCity } from 'react-icons/fa';

import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Form } from '@unform/web';

import imageCongratulations from '~/assets/images/congratulations.svg';

import {
  Container,
  Panel,
  PanelBody,
  PanelButton,
  PanelHeader,
  PanelTitle,
  AddressFieldContainer,
} from './styles';

import { getValidationErrors, normalizeText } from '~/utils';
import Input from '~/components/Input';
import api from '~/services/api';

const Dashboard = () => {
  const formRef = useRef(null);

  const [success, setSuccess] = useState(false);
  const [showAddressField, setShowAddressField] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async data => {
    const formattedPhone = normalizeText(data.phone);
    const formattedZip = normalizeText(data.addressZip);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório')
          .min(8, 'mínimo de 8 letras.'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        phone: Yup.string()
          .required('Telefone obrigatório')
          .transform(value => value.replace(/[^0-9]/g, ''))
          .min(10, 'Prrencha todo o campo!'),
        addressZip: Yup.string().required('CEP obrigatório'),
        addressStreet: Yup.string().required('Logradouro obrigatório'),
        addressNumber: Yup.string().required('Número obrigatório'),
        addressComplement: Yup.string().required('Complemento obrigatório'),
        addressDistrict: Yup.string().required('Bairro obrigatório'),
        addressCity: Yup.string().required('Cidade obrigatória'),
        addressState: Yup.string().required('Estado obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('https://simple-api-selection.herokuapp.com/submit/', {
        name: data.name,
        email: data.email,
        phone: formattedPhone,
        addressZip: formattedZip,
        addressStreet: data.addressStreet,
        addressNumber: data.addressNumber,
        addressComplement: data.addressComplement,
        addressDistrict: data.addressDistrict,
        addressCity: data.addressCity,
        addressState: data.addressState,
      });

      setSuccess(true);
      setLoading(false);
      toast.success('Deu Tudo Certo, Parabéns!');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);
        setLoading(false);
      }

      toast.error('Erro ao validar os dados, Tente Novamente.');
    }
  }, []);

  const getCepData = useCallback(async event => {
    const { value } = event.target;

    const formattedValue = value.replace(/[^0-9]/g, '');

    if (formattedValue.length !== 8) return;

    const result = await api.get(`${formattedValue}/json/`);

    const { data } = result;

    formRef.current.setData({
      addressZip: formattedValue,
      addressStreet: data.logradouro,
      addressDistrict: data.bairro,
      addressCity: data.localidade,
      addressState: data.uf,
    });

    setShowAddressField(true);
    setDisable(false);
  }, []);

  return (
    <Container>
      <Panel>
        {success ? (
          <div className="sucess-div">
            <h1> Muito bom! Você receberá seus adesivos em alguns dias </h1>
            <img
              className="img-congratulations"
              src={imageCongratulations}
              alt=""
              width="500"
              height="500"
            />
          </div>
        ) : (
          <>
            <PanelHeader>
              <PanelTitle>
                {' '}
                Preencha o formulário e receba um envelope com adesivos de
                programação!
              </PanelTitle>
            </PanelHeader>

            <PanelBody>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input autoFocus name="name" icon={FiUser} placeholder="Nome" />

                <Input name="email" icon={FiMail} placeholder="Email" />

                <Input
                  mask="(99) 99999-9999"
                  customMask
                  name="phone"
                  icon={FiSmartphone}
                  placeholder="Telefone"
                />

                <Input
                  mask="99999-999"
                  customMask
                  name="addressZip"
                  onBlur={getCepData}
                  icon={FiTrello}
                  placeholder="CEP"
                />

                <AddressFieldContainer show={showAddressField}>
                  <Input
                    name="addressStreet"
                    icon={GiDoubleStreetLights}
                    placeholder="Logradouro"
                    disabled={
                      formRef.current &&
                      formRef.current.getFieldValue('addressStreet').length > 0
                    }
                  />

                  <Input
                    name="addressDistrict"
                    icon={GiHomeGarage}
                    placeholder="Bairro"
                    disabled={
                      formRef.current &&
                      formRef.current.getFieldValue('addressDistrict').length >
                        0
                    }
                  />

                  <Input
                    name="addressCity"
                    icon={MdLocationCity}
                    placeholder="Cidade"
                    disabled={
                      formRef.current &&
                      formRef.current.getFieldValue('addressCity').length > 0
                    }
                  />

                  <Input
                    name="addressState"
                    icon={FaCity}
                    placeholder="Estado"
                    disabled={
                      formRef.current &&
                      formRef.current.getFieldValue('addressState').length > 0
                    }
                  />

                  <Input
                    name="addressNumber"
                    icon={AiOutlineFieldNumber}
                    autoFocus
                    placeholder="Número"
                  />

                  <Input
                    name="addressComplement"
                    icon={FiMoreHorizontal}
                    placeholder="Complemento"
                  />
                </AddressFieldContainer>

                {!loading ? (
                  <PanelButton disabled={disable} type="submit">
                    {' '}
                    Enviar{' '}
                  </PanelButton>
                ) : (
                  <PanelButton disabled={disable} type="submit">
                    <div className="c-loader" />
                  </PanelButton>
                )}
              </Form>
            </PanelBody>
          </>
        )}
      </Panel>
    </Container>
  );
};

export default Dashboard;
