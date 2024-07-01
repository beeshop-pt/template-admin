import { fn } from '@storybook/test'
import Input from '@/components/forms/Input.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Inputs',
  tags: ["autodocs"],
  component: Input
}

export const InputText = {
  args: {
    title: 'Input Text',
    name: 'input-text',
    placeholder: 'Input Text',
  }
}

export const InputEmail = {
  args: {
    title: 'Input Email',
    name: 'input-email',
    type: 'email',
    placeholder: 'Input Email',
  }
}

export const InputNumber = {
  args: {
    title: 'Input Number',
    name: 'input-number',
    type: 'number',
    placeholder: 'Input Number',
  }
}

export const InputDate = {
  args: {
    title: 'Input Date',
    name: 'input-date',
    type: 'date',
  }
}

export const InputFile = {
  args: {
    title: 'Input File',
    name: 'input-file',
    type: 'file',
  }
}

export const InputColor = {
  args: {
    title: 'Input Color',
    name: 'input-color',
    type: 'color',
  }
}