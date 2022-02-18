import { Button, Card, CardActions, CardHeader, Link } from '@mui/material';

type Props = {word: string}

const WordCardMini = (props: Props) => {
  return (
    <div>
      <Card sx={{ maxWidth: '100%' }}>
        <CardHeader lang='ja' title={props.word} />
        <CardActions>
          <Link
            href={`https://jisho.org/search/${props.word}`}
            underline='none'
          >
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
    </div>
  );
}

export default WordCardMini
