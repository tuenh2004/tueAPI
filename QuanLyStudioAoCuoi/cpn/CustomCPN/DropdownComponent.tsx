import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: '13x18', value: '1'},
  {label: '20x25', value: '2'},
  {label: '20x30', value: '3'},
  {label: '25x25', value: '4'},
  {label: '30x30', value: '5'},
  {label: '30x20', value: '6'},
  {label: '40x40', value: '7'},
  {label: '60x120', value: '8'},
];

const DropdownComponent = ({onSizeSelect}) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Chọn kích thước ảnh"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        onSizeSelect && onSizeSelect(item.label);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
