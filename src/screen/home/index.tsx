import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../hooks';

import {
  increment,
  nextQuestion,
  resetQuiz,
  setAnswer,
} from '../../features/quiz';

import Badge from '../../components/badge';
import Header from '../../components/header';
import CheckBox from '../../components/checkbox';

function Finish() {
  const dispatch = useAppDispatch();
  const quiz = useAppSelector(state => state.quiz);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', paddingBottom: 2, color: 'black'}}>
        Felicitation !
      </Text>
      <Text style={{paddingBottom: 10, color: 'black'}}>
        {' '}
        Voici votre Score
      </Text>

      <Badge value={`${quiz.score}/${quiz.questions.length}`} fontSize={26} />

      <Pressable
        style={{
          backgroundColor: '#49A8EE',
          paddingHorizontal: 15,
          paddingVertical: 6,
          borderRadius: 15,
          marginVertical: 10,
        }}
        onPress={() => dispatch(resetQuiz())}>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>
          refaire le test
        </Text>
      </Pressable>
    </View>
  );
}

function DisplayCard() {
  const quiz = useAppSelector(state => state.quiz);

  return (
    <View style={styles.displayCard}>
      <View>
        <Text style={{paddingBottom: 4}}>Question</Text>
        <Badge value={`${quiz.currentQuestion + 1}/${quiz.questions.length}`} />
      </View>
      <Timer />
    </View>
  );
}

function Timer() {
  const quiz = useAppSelector(state => state.quiz);
  const currentQuestion = quiz.currentQuestion;
  const currentResponse = quiz.currentResponse;
  const questions = quiz.questions;
  const question = questions[currentQuestion];

  const [timer, setTimer] = React.useState(-1);
  const id = React.useRef<any>(null);
  const dispatch = useAppDispatch();

  function clear() {
    clearInterval(id.current);
  }

  React.useEffect(() => {
    setTimer(question.time);
    id.current = setInterval(() => {
      setTimer(time => time - 1);
    }, 1000);
    return () => clear();
  }, [currentQuestion]);

  React.useEffect(() => {
    if (timer === 0) {
      clear();
      if (currentResponse) {
        dispatch(increment());
      }
      dispatch(nextQuestion());
    }
  }, [timer]);

  return (
    <View>
      <Text style={{paddingBottom: 4}}>Temps ecoule</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Badge value={0} />
        <Badge value={timer} />
      </View>
    </View>
  );
}

function Answers({question}: any) {
  const selectedIndexAnswer = useAppSelector(
    state => state.quiz.selectedIndexAnswer,
  );
  const dispatch = useAppDispatch();

  function onCheck(val: boolean, correct: boolean, index: number) {
    dispatch(setAnswer({index, correct: val && correct}));
  }

  return question.answers.map(({correct, label}: any, index: number) => {
    return (
      <View key={`answer-${index}`} style={styles.answerWrapper}>
        <CheckBox
          checked={selectedIndexAnswer === index}
          onPress={val => onCheck(val, correct, index)}
        />
        <Text style={styles.answerLabel}>{label}</Text>
      </View>
    );
  });
}

export default function Home() {
  const state = useAppSelector(state => state);
  const user = state.user;
  const quiz = state.quiz;
  const questions = quiz.questions;
  const currentQuestion = quiz.currentQuestion;
  const currentResponse = quiz.currentResponse;

  const question = questions[currentQuestion];
  const dispatch = useAppDispatch();

  function onPressNext() {
    if (currentResponse) {
      dispatch(increment());
    }
    dispatch(nextQuestion());
  }

  return (
    <>
      <Header
        title={`Hi, ${user.username}`}
        subTitle="Lorem ipsum dolor sit amet consectetur,"
      />
      {currentQuestion < questions.length ? (
        <View style={{flex: 1, paddingBottom: 20}}>
          <DisplayCard />
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View key={question.id} style={styles.item}>
              <View style={{paddingVertical: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000'}}>
                  Question {currentQuestion + 1}
                </Text>
                <Text style={{fontWeight: '500', fontSize: 14, color: '#000'}}>
                  {question.label}
                </Text>
              </View>
              <Answers question={question} />
            </View>
          </ScrollView>
          <Pressable
            style={({pressed}) => [
              styles.nextButton,
              {backgroundColor: pressed ? 'grey' : '#49A8EE'},
            ]}
            onPress={() => onPressNext()}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              Suivant
            </Text>
          </Pressable>
        </View>
      ) : (
        <Finish />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  displayCard: {
    width: '85%',
    alignSelf: 'center',
    top: -40,
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    ...Platform.select({
      android: {
        elevation: 15,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
    }),
  },
  item: {
    paddingHorizontal: 30,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  answerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  answerLabel: {
    paddingLeft: 10,
  },
  nextButton: {
    width: 180,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
});
