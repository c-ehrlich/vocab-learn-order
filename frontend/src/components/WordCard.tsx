import { styled } from '@mui/material/styles';
import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Typography } from '@mui/material';
import { IWord } from '../interfaces/IWord';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  word: IWord;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  // TODO the thing below doesn't actually do anything
  // can i put some numbers in my theme to make the card open faster?
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const WordCard = (props: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card sx={{ maxWidth: '100%' }}>
        <CardHeader
          title={props.word.word}
        />
        <CardContent>
          <Typography variant='body1' color='text.secondary'>
            {(props.word.jmdict).join(', ')}
          </Typography>
        </CardContent>
        {/* vvv can add disableSpacing */}
        <CardActions>
          <a href={`https://jisho.org/search/${props.word.word}`}>Jisho</a>
          <a href={`https://youglish.com/pronounce/${props.word.word}/japanese`}>YouGlish</a>
          <a href={`https://www.immersionkit.com/dictionary?keyword=${props.word.word}`}>ImmersionKit</a>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            {(props.word.jlpt && props.word.jlpt.length !== 0) && <Typography>JLPT: {props.word.jlpt.map(item => item[1]).join(', ')}</Typography>}
            {props.word.animeJDrama && <Typography>Anime & J-Drama: {props.word.animeJDrama}</Typography>}
            {props.word.bccwj && <Typography>BCCWJ: {props.word.bccwj}</Typography>}
            {props.word.innocent && <Typography>Innocent: {props.word.innocent}</Typography>}
            {props.word.kokugojiten && <Typography>国語辞典: {props.word.kokugojiten}</Typography>}
            {props.word.narou && <Typography>Narou: {props.word.narou}</Typography>}
            {props.word.netflix && <Typography>Netflix: {props.word.netflix}</Typography>}
            {props.word.novels&& <Typography>Novels: {props.word.novels}</Typography>}
            {props.word.vn && <Typography>Visual Novels: {props.word.vn}</Typography>}
            {props.word.wikipedia && <Typography>Wikipedia: {props.word.wikipedia}</Typography>}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default WordCard;
