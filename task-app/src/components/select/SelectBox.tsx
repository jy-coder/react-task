import type { GroupBase, Props } from 'react-select';
import { selectStyles } from './selectStyles';
import Select from 'react-select';

export const SelectBox = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group>
) => <Select {...props} styles={selectStyles} />;
