import { Slider, Typography } from '@mui/material';
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
  return (
    <div>
      {frequencyLists.map((list) => (
        <div>{list.title}</div>
      ))}
      <Typography gutterBottom>Anime & J-Drama</Typography>
      <Slider
        onChange={(e: Event) =>
          console.log((e.target as HTMLInputElement).value)
        }
        valueLabelDisplay='auto'
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        aria-label='custom thumb label'
        defaultValue={20}
      />
    </div>
  );
};

export default Sliders;
