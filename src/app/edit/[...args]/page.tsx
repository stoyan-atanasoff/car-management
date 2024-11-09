'use client'

import React from 'react'

import { Container } from '@radix-ui/themes'

import { FormManager } from '@/app/edit/[...args]/components/FormManager'
import { FormProvider } from '@/app/edit/[...args]/components/FormContext'
import { LeftColumn } from '@/app/edit/[...args]/components/LeftColumn'

const CarForm: React.FC = () => {
  return (
    <FormProvider>
      <Container>
        <div className="min-h-screen flex flex-col md:flex-row shadow-lg">
          {/* Left Column - Navigation */}
          <LeftColumn />
          {/* Right Column - Form */}
          <FormManager />
        </div>
      </Container>
    </FormProvider>
  )
};

export default CarForm;
