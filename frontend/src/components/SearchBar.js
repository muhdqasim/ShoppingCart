import {StyledTextField} from '../helpers/styles';
import { useState, useEffect } from 'react';

/**
 * SearchBar component
 * @param {*} param0 
 * @returns 
 */
const SearchBar = ({onChangeCallback}) => { 
    const [value, setValue] = useState('');

    /**
     * Debounce the search to avoid multiple calls to the server.
     * Trigger the search after 1.5 seconds of inactivity.
     */
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          onChangeCallback(value);
        }, 1500)
    
        return () => clearTimeout(delayDebounceFn)
      }, [onChangeCallback, value])
    
    return (
      <StyledTextField
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search from our catalogue..."
        margin="normal"
        variant="standard"
      />
    );
}
  
export default SearchBar;