import { Box, Slider, Typography } from '@mui/material';
import { TFrequencyListWeights } from '../types/TFrequencyListWeights.type';
import useStore from '../store';
import ValueLabelComponent from './ValueLabelComponent';

type Props = {};

const frequencyLists = [
  { name: 'animeJDrama', title: 'Anime & J-Drama' },
  { name: 'bccwj', title: 'BCCWJ' },
  { name: 'innocent', title: 'Innocent Corpus' },
  { name: 'kokugojiten', title: '国語辞典' },
  { name: 'narou', title: 'Narou' },
  { name: 'netflix', title: 'Netflix' },
  { name: 'novels', title: 'Novels' },
  { name: 'vn', title: 'Visual Novels' },
  { name: 'wikipedia', title: 'Wikipedia' },
];

const Sliders = (props: Props) => {
  // function to set sliders value in state
  // maybe use immer here?
  const { frequencyListWeights, setFrequencyListWeights } = useStore();

  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      {frequencyLists.map((list) => (
        <Box key={list.name}>
          <Typography lang='ja' gutterBottom>{list.title}</Typography>
          <Slider
            onChange={(e: Event) => {
              console.log((e.target as HTMLInputElement).value);
              setFrequencyListWeights({
                ...frequencyListWeights,
                [list.name]: (e.target as HTMLInputElement).value,
              });
            }}
            valueLabelDisplay='auto'
            components={{
              ValueLabel: ValueLabelComponent,
            }}
            aria-label='custom thumb label'
            value={
              frequencyListWeights[list.name as keyof TFrequencyListWeights]
            }
          />
        </Box>
      ))}
    </Box>
  );
};

export default Sliders;
