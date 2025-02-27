import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import Flag from 'react-world-flags';
import { useState, useEffect } from 'react';
import i18n from 'i18next';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();

  const [language, setLanguage] = useState<string>(i18n.language || 'en');

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  useEffect(() => {
    setLanguage(i18n.language || 'en');
  }, [i18n.language]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: 'white',
      }}
    >
      <FormControl variant="outlined">
        <InputLabel id="language-select-label" sx={{ color: 'white' }}>
          Language
        </InputLabel>
        <Select
          labelId="language-select-label"
          value={language} // Controlled Select (uses state)
          onChange={(e) => changeLanguage(e.target.value as string)}
          label="Language"
          sx={{ minWidth: 120, color: 'white' }}
        >
          <MenuItem value="en">
            <Flag code="US" style={{ width: 20, height: 15, marginRight: 10 }} />
            English
          </MenuItem>
          <MenuItem value="es">
            <Flag code="ES" style={{ width: 20, height: 15, marginRight: 10 }} />
            Español
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
