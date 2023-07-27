import {Container, SubContainer, Title} from "./header.styled.tsx";
import {Button, createStyles} from "@mantine/core";
import {Link} from "react-router-dom";

const useStyles = createStyles({
    button: {
        position: 'absolute',
        right: 10
    }
})

type Props = {
    actionButtonLabel: string;
    actionButtonDest: string
}


const Header = ({actionButtonLabel, actionButtonDest}: Props) => {
    const {classes} = useStyles()

    return <Container>
        <SubContainer>
            <Title>PR Buddy</Title>
            <Button className={classes.button} to={actionButtonDest} component={Link}>{actionButtonLabel}</Button>
        </SubContainer>
    </Container>
};

export default Header;
