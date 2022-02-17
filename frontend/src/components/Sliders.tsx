import { Box, Slider, Typography } from '@mui/material';
import ValueLabelComponent from './ValueLabelComponent';

type Props = {};

const frequencyLists = [
  { name: 'animeJDrama', title: 'Anime & J-Drama' },
  { name: 'bccwj', title: 'BCCWJ' },
  { name: 'innocent', title: 'Innocent Corpus' },
  { name: 'kukugojiten', title: '国語辞典' },
  { name: 'narou', title: 'Narou' },
  { name: 'netflix', title: 'Netflix' },
  { name: 'novels', title: 'Novels' },
  { name: 'vn', title: 'Visual Novels' },
  { name: 'wikipedia', title: 'Wikipedia' },
];

const Sliders = (props: Props) => {
  // function to set sliders value in state
  // maybe use immer here?
  
  return (
    <Box sx={{ m: 2 }}>
      {frequencyLists.map((list) => (
        <div>
          <Typography gutterBottom>{list.title}</Typography>
          <Slider
            onChange={(e: Event) =>
              console.log((e.target as HTMLInputElement).value)
            }
            valueLabelDisplay='auto'
            components={{
              ValueLabel: ValueLabelComponent,
            }}
            aria-label='custom thumb label'
            sx={{ color: 'secondary.main' }}
            defaultValue={20}
          />
        </div>
      ))}
    </Box>
  );
};

export default Sliders;
