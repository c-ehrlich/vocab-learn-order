import { styled } from '@mui/material/styles';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Link,
} from '@mui/material';
import useStore from '../store';
import DoneIcon from '@mui/icons-material/Done';
import { motion } from 'framer-motion';
import animations from '../themes/animations';
import { serializeWords } from '../utils/serializeWords';
import { setLocalStorage } from '../utils/localStorageHelpers';

type Props = { word: string };

const WordCardMini = (props: Props) => {
  const { serverResponse, removeNotFoundWordFromServerResponse } = useStore();

  return (
    <Card
      component={motion.div}
      {...animations}
      layout
      aria-label='word-card-mini'
      sx={{ maxWidth: '100%' }}
    >
      <CardHeader
        lang='ja'
        title={props.word}
        titleTypographyProps={{
          fontFamily: 'Hiragino Kaku Pro, Meiryo',
          fontWeight: 400,
          fontSize: '24pt',
        }}
        action={
          <CheckIconButton
            aria-label='settings'
            onClick={() => {
              removeNotFoundWordFromServerResponse(props.word);
              const savedWords = serializeWords(
                serverResponse!.words,
                serverResponse!.notFound
              );
              setLocalStorage('vocablist', JSON.stringify(savedWords));
            }}
          >
            <DoneIcon />
          </CheckIconButton>
        }
      />
      <CardActions sx={{ paddingLeft: 2, paddingBottom: 2 }}>
        <CardActionButtons>
          <LinkWithoutMargin
            href={`https://jpdb.io/search?q=${props.word}&lang=japanese`}
            target='_blank'
            rel='noopener'
            underline='none'
          >
            <Button size='medium' variant='contained'>
              JPDB
            </Button>
          </LinkWithoutMargin>
          <LinkWithoutMargin
            href={`https://youglish.com/pronounce/${props.word}/japanese`}
            target='_blank'
            rel='noopener'
            color='inherit'
            underline='none'
          >
            <Button size='medium' variant='contained'>
              YouGlish
            </Button>
          </LinkWithoutMargin>
          <LinkWithoutMargin
            href={`https://www.immersionkit.com/dictionary?keyword=${props.word}`}
            target='_blank'
            rel='noopener'
            color='inherit'
            underline='none'
          >
            <Button size='medium' variant='contained'>
              ImmersionKit
            </Button>
          </LinkWithoutMargin>
        </CardActionButtons>
      </CardActions>
    </Card>
  );
};

const CheckIconButton = styled(IconButton)`
  margin-right: 8px;
  margin-top: 4px;
`;

const CardActionButtons = styled(CardActions)`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;
  @media (max-width: 460px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px 0;
  }
`;

const LinkWithoutMargin = styled(Link)`
  margin: 0px !important;
`;

export default WordCardMini;
