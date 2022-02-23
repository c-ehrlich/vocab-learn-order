import { Button, Card, CardActions, CardHeader, Link } from '@mui/material';

type Props = { word: string };

const WordCardMini = (props: Props) => {
  return (
    <Card aria-label="word-card-mini" sx={{ maxWidth: '100%' }}>
      <CardHeader
        lang='ja'
        title={props.word}
        titleTypographyProps={{
          fontFamily: 'Hiragino Kaku Pro, Meiryo',
          fontWeight: 400,
          fontSize: '24pt',
        }}
      />
      <CardActions sx={{ paddingLeft: 2, paddingBottom: 2 }}>
        <Link href={`https://jisho.org/search/${props.word}`} underline='none'>
          <Button size='medium' variant='contained'>
            Jisho
          </Button>
        </Link>
        <Link
          href={`https://youglish.com/pronounce/${props.word}/japanese`}
          color='inherit'
          underline='none'
        >
          <Button size='medium' variant='contained'>
            YouGlish
          </Button>
        </Link>
        <Link
          href={`https://www.immersionkit.com/dictionary?keyword=${props.word}`}
          color='inherit'
          underline='none'
        >
          <Button size='medium' variant='contained'>
            ImmersionKit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default WordCardMini;
