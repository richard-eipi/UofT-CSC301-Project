import styled from 'styled-components'

export const StyledLoading = styled.div`
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #0C75D1;
    width: 442px;
    height: 442px;
    align-self: center;

    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`