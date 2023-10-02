// for display variable is defined in App.css
export const selectStyles = {
  option: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    color: '#fff',
    backgroundColor: state.isSelected ? '#82c91e' : '#1a2332'
  }),

  control: (defaultStyles: any) => ({
    ...defaultStyles,
    backgroundColor: '#212529',
    boxShadow: 'none',
    borderColor: '#a4b1cd',
    '&:hover': {
      borderColor: '#a4b1cd'
    }
  }),
  placeholder: (defaultStyles: any) => ({
    ...defaultStyles,
    color: '#fff'
  }),

  singleValue: (provided: any) => ({
    ...provided,
    gridArea: 'auto',
    color: '#ffffff'
  })
};
