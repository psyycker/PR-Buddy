import {Container, SubContainer, Title} from "./header.styled.tsx";
import {Button, createStyles} from "@mantine/core";
import {Link} from "react-router-dom";
import {useUpdatePrs} from "../../contexts/pull-requests-context.tsx";

const useStyles = createStyles({
    button: {
        position: 'absolute',
        right: 10
    },
    refreshBtn: {
        position: 'absolute',
        right: 110
    }
})

type Props = {
    actionButtonLabel: string;
    actionButtonDest: string;
    allowRefresh?: boolean
}


const Header = ({actionButtonLabel, actionButtonDest, allowRefresh = false}: Props) => {
    const updatePrs = useUpdatePrs()
    const {classes} = useStyles()

    return <Container>
        <SubContainer>
            <Title>PR Buddy</Title>
            {allowRefresh && <Button className={classes.refreshBtn} onClick={updatePrs}>Refresh</Button>}
            <Button className={classes.button} to={actionButtonDest} component={Link}>{actionButtonLabel}</Button>
        </SubContainer>
    </Container>
};

export default Header;
