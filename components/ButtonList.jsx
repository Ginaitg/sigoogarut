import { Button } from 'native-base';

const ButtonList = ({isSelected, name, onPress}) => {
    return (
        <Button variant={isSelected ? 'solid' : 'outline'} mx={1} colorScheme='info' borderColor={isSelected ? 'info.600' : 'info.100'} borderWidth={'2'} color={'white'} _text={{color: 'white'}} borderRadius={'40'} size={'sm'} onPress={onPress} >{name}</Button>
    )
}

export default ButtonList;