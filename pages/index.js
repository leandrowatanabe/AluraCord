import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import React from 'react';
import { useRouter } from 'next/router';

function Titulo(props){
    const Tag = props.tag || 'h1';
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag}{
                    color:${appConfig.theme.colors.neutrals['900']};
                    font-size: 24px;
                    font-weight: 600
                }
            `}</style>
        </>

    )
}

// function HomePage(){
//     return (
//     <div>
//         <GlobalStyle/>
//         <Titulo tag="h1">Boas vindas de Volta!</Titulo>
//         <h2>Discord - Alura Matrix</h2>
//     </div>
//     )
// }
//
//export default HomePage

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('leandrowatanabe');
    const [userImage, setUserImage] = React.useState(`https://github.com/${username}.png`);
    const [followers, setFollowers] = React.useState(`https://api.github.com/users/${username}/followers`)
    const [repos, setRepos] = React.useState(`https://api.github.com/users/${username}/repos`)
    const roteamento = useRouter()
    
    React.useEffect(()=>{
      fetch(`https://api.github.com/users/${username}/followers`)
      .then((response)=>response.json())
      .then(data=>setFollowers(data.length))
    })

    React.useEffect(()=>{
      fetch(`https://api.github.com/users/${username}/repos`)
      .then((response)=>response.json())
      .then(data=>setRepos(data.length))
    })


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
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function(infosDoEvento){
                infosDoEvento.preventDefault();
                console.log('alguem submeteu o form')
                localStorage.setItem('username',JSON.stringify(username))
                roteamento.push('/chat')
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              {/* <input
                  type="text"
                  value={`${username}`}
                  onChange={function (event){
                    setUsername(event.target.value)
                  }}
              /> */}
              <TextField
                value={`${username}`}
                onChange={function (event){
                  const value = event.target.value
                  setUsername(value)

                  if(value.length > 2){
                    setUserImage(`https://github.com/${value}.png`)
                  }else{
                    setUserImage('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
                  }
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                disabled={!username}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={userImage}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username?username:" "}
 
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {repos? "Repos: " + repos: " "}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {followers? "Followers: " + followers : " "}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }