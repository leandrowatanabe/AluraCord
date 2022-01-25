import { Box, Text, Button } from '@skynexui/components';
import appConfig from '../config.json'
import { useRouter } from 'next/router';

export default function ChatPage() {
    const roteamento = useRouter()

    return (
        <>
            <Box
                styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a7a77aae-7442-4fb3-8310-174a865aa91a/d2ytlbi-80f3d193-f444-4e66-bf3f-17a20003ea39.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E3YTc3YWFlLTc0NDItNGZiMy04MzEwLTE3NGE4NjVhYTkxYVwvZDJ5dGxiaS04MGYzZDE5My1mNDQ0LTRlNjYtYmYzZi0xN2EyMDAwM2VhMzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.K60xrFvGpFRg18zVW2r7TpMAVR2rYAeAYTb0mX3R7Hw)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                }}
            >   
                <Box
                    styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    <Text variant="heading1" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                        Página em Construção
                    </Text>
                    
                    <Button
                        type='button'
                        label='Voltar'
                        onClick={function(infosDoEvento){
                            infosDoEvento.preventDefault();
                            console.log('Clickou no botao de retornar a pagina inicial')
                            roteamento.push('/')
                        }}
                        buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary[600],
                        }}
                    />

                </Box>
            </Box>
        </>
        
    )
  }