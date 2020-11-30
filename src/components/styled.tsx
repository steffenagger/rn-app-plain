import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

export const PressableFrame = styled.TouchableOpacity`
  background-color: #f9c2ff;
  padding: 20px;
  margin: 8px 16px;
`;

export const EditFrame = styled.View`
  background-color: #d3ffc2;
  padding: 20px;
  margin: 8px 16px;
`;

export const CreateFrame = styled.View`
  background-color: #c2dcff;
  padding: 20px;
  margin: 8px 16px;
`;

export const Tittle = styled.Text`
  text-align: center;
  font-size: ${(p: {fontSize?: string}) => p.fontSize || '24px'};
`;

export const SubTittle = styled.Text`
  font-size: ${(p: {fontSize?: string}) => p.fontSize || '16px'};
  font-weight: bold;
`;

export const TextBox = styled.TextInput`
  height: 40px;
  border: 1px solid #cecece;
`;

export const Text = styled.Text``;
