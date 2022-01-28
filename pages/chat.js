import React from 'react';
import { useRouter } from 'next/router';

import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js'

import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import appConfig from '../config.json';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

function escutaMensagem(resposta){

    return supabaseClient
        .from('mensagens')
        .on('*',( respostaLive ) => { 
            resposta(respostaLive)
         })
        .subscribe()
        
}

export default function ChatPage() {
    const roteamento = useRouter()

    const username = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(()=>{
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({data})=>{
                console.log('Dados da consulta: ', data)
                setListaDeMensagens(data)
            })

        escutaMensagem((resposta)=>{
            if(resposta.eventType=='INSERT'){
                setListaDeMensagens((valorAtualDaLista)=>{
                    return[
                        resposta.new,
                        ...valorAtualDaLista,
                        ]
                    }
                );
            }
            if(resposta.eventType=='DELETE'){
                setListaDeMensagens((valorAtualDaLista)=>{
                    const lista = valorAtualDaLista.filter((mensagem)=>{if(mensagem.id != resposta.old.id) return mensagem})
                    return[
                        ...lista,
                        ]
                    }
                );
            }
        }
        );

    },[])

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: username,
            texto: novaMensagem,
        };
        if(novaMensagem){
            supabaseClient
                .from('mensagens')
                .insert([
                    mensagem
                ])
                .then(({data})=>{
                    //console.log('Criando a mensagem: ', resposta)
                    // setListaDeMensagens([
                    //     data[0],
                    //     ...listaDeMensagens,
                    // ]);
                })

            setMensagem('');
        }
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a7a77aae-7442-4fb3-8310-174a865aa91a/d2ytlbi-80f3d193-f444-4e66-bf3f-17a20003ea39.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E3YTc3YWFlLTc0NDItNGZiMy04MzEwLTE3NGE4NjVhYTkxYVwvZDJ5dGxiaS04MGYzZDE5My1mNDQ0LTRlNjYtYmYzZi0xN2EyMDAwM2VhMzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.K60xrFvGpFRg18zVW2r7TpMAVR2rYAeAYTb0mX3R7Hw)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px'
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px'
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} username={username} setListaDeMensagens={setListaDeMensagens} />

                    <Box
                        onSubmit={function(infosDoEvento){
                            infosDoEvento.preventDefault();
                            handleNovaMensagem(mensagem);
                        }}
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'collumn'
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                height: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker 
                            onStickerClick={(sticker)=>{
                                handleNovaMensagem(':sticker:' + sticker)
                            }}
                        />
                        <Button
                            type='submit'
                            label='Enviar'
                            styleSheet={{
                                height: '85%',
                                width: 'auto',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                            }}
                            buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.neutrals[500],
                            mainColorLight: appConfig.theme.colors.neutrals[400],
                            mainColorStrong: appConfig.theme.colors.neutrals[600],
                            }}
                            
                        />
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}



    
function MessageList(props) {

    function handleApagar(id){

        const {data} = supabaseClient
            .from('mensagens')
            .delete()
            .match({id})
            .then({data})

    }

    function handleEditar(id, texto){
        console.log(id, texto)
    }

    return (
        
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                //scrollBehavior: 'smooth',
            }}
        >
                {props.mensagens.map((mensagem) => {
                return (
                    <Box
                        styleSheet={{
                            display: 'flex',
                            color: appConfig.theme.colors.neutrals["000"],
                            marginBottom: '16px',
                            width: '100%',
                            resize: 'none',

                        }}
                    >
                        <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            width: '100%',
                            resize: 'none',
                            borderRadius: '5px',
                            padding: '6px',
                            flex: 2,
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                        >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ?(<Image src={mensagem.texto.replace(':sticker:','')} />)
                            : mensagem.texto
                        }
                        </Text>
                        {/* <Button
                            type='button'
                            label='e'
                            disabled={mensagem.de != props.username}
                            onClick={()=>{
                                handleEditar(mensagem.id, mensagem.texto);
                            }}
                            styleSheet={{
                                color: 'white',
                                width: '30px',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '2px 2px', 
                                marginBottom: '12px',
                                backgroundColor: appConfig.theme.colors.neutrals[600],
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[400],
                                mainColorStrong: appConfig.theme.colors.neutrals[600],
                            }}
                            
                        /> */}
                        <Button
                            type='button'
                            label='x'
                            disabled={mensagem.de != props.username}
                            onClick={()=>{
                                handleApagar(mensagem.id);
                            }}
                            styleSheet={{
                                color: 'red',
                                width: '30px',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '2px 2px', 
                                marginBottom: '12px',
                                backgroundColor: appConfig.theme.colors.neutrals[600],
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[400],
                                mainColorStrong: appConfig.theme.colors.neutrals[600],
                            }}
                            
                        />
                    </Box>             
                );
            })}
        </Box>
    )
}