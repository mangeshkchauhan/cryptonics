import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}>
			<Button variant={'unstyled'} color={'white'}>
				<Link to='/cryptonics'>Home</Link>
			</Button>
			<Button variant={'unstyled'} color={'white'}>
				<Link to='/cryptonics/exchanges'>Exchanges</Link>
			</Button>
			<Button variant={'unstyled'} color={'white'}>
				<Link to='/cryptonics/coins'>Coins</Link>
			</Button>
		</HStack>
	);
};

export default Header;
