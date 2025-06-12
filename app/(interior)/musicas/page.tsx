"use client"

import { useState } from "react"
import PageHeader from "@/components/page-header"
import MusicPlayer from "@/components/music-player"
import type { Song } from "@/components/music-player"

export default function MusicasPage() {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: 1,
      title: "Por Eso Te Amo",
      artist: "Río Roma",
      src: "/assets/music/Río Roma - Por Eso Te Amo.mp3",
      cover: "/assets/music/img/por eso te amo.jpg",
      color: "from-pink-500 to-rose-600",
      dedicatoria:
        "Cada vez que escucho \"Por Eso Te Amo\" de Río Roma, no puedo evitar pensar en ti. Es como si cada palabra estuviera escrita para describir lo que siento desde que llegaste a mi vida. Esa canción no solo es hermosa, es nuestra. Porque resume exactamente lo que me pasa contigo: no hay una sola razón por la que te amo, hay miles… y siguen apareciendo cada día.\n\nTe amo por tu forma de mirarme, como si vieras en mí algo que ni yo sabía que tenía.\nTe amo por la paz que me das con solo estar cerca, por ese abrazo tuyo que detiene el tiempo y me hace sentir que todo va a estar bien.\nTe amo por cómo me hablas, por cómo me escuchas, por cómo estás ahí aunque no diga una sola palabra.\nTe amo incluso cuando no haces nada extraordinario, porque lo extraordinario eres tú, simplemente siendo tú.\n\nA veces me preguntan por qué estoy tan enamorado/a de ti… y la verdad es que no hay una respuesta que lo explique del todo. Porque no se trata de una lógica, se trata de un sentimiento que nace del alma y que crece con cada sonrisa tuya, con cada gesto, con cada silencio compartido.\nY eso es exactamente lo que dice la canción: \"porque simplemente no puedo explicarlo\". Solo sé que te amo, con todo lo que eso implica: con alegría, con entrega, con ganas de compartir mi vida contigo.\n\nEsta canción me recuerda a ti porque cada verso habla de cómo te has vuelto parte de mí. Porque amar no es solo decirlo, es sentirlo hasta en los días más simples, es encontrarte en los detalles, en los pensamientos que vienen sin aviso, en los sueños que siempre te incluyen.\n\nPor eso te amo:\nPorque me haces mejor sin pedirme nada,\nporque desde que estás, todo tiene más sentido,\nporque tú eres ese milagro cotidiano que hace de mi vida algo más bonito.\n\nGracias por existir, por ser tú, por dejarme amarte así, sin medida.\nEres mi canción favorita hecha persona.\nY por eso, por todo… por eso te amo.\n\nCon todo mi amor,"
    },
    
    {
      id: 2,
      title: "Tu Vida en la Mía",
      artist: "Marc Anthony",
      src: "/assets/music/Marc Anthony - Tu Vida en la Mía (Official Video).mp3",
      cover: "/assets/music/img/tu vida en la mia.jpg",
      color: "from-blue-500 to-purple-600",
      dedicatoria:
        "Amor mío,\n\nHay canciones que se sienten, que no solo se escuchan… y \"Tu Vida en la Mía\" es una de ellas. Porque cuando la oigo, es como si alguien hubiese traducido todo lo que yo siento por ti en música y versos. Cada palabra me recuerda que desde que llegaste, nada volvió a ser igual. Y qué hermoso es decirlo con alegría: tú transformaste mi mundo.\n\nAntes de ti, tenía sueños… pero ahora tienen dirección.\nTenía días… pero ahora tienen sentido.\nTenía un corazón… pero ahora late por alguien.\nEse alguien eres tú.\n\nTú llegaste a mi vida como ese milagro inesperado, como ese regalo que uno no sabe que necesita hasta que lo tiene en las manos. Y desde entonces, me siento más completo/a, más yo, más libre, más feliz. Porque tú no solo entraste en mi historia, tú la escribiste conmigo desde cero.\n\nPusiste tu vida en la mía, y desde entonces compartimos más que momentos: compartimos caminos, decisiones, silencios y risas, y una conexión que va más allá de todo lo que puedo explicar.\nNo es solo que te amo: es que te reconozco como parte de mí. Como si nuestras almas se hubieran estado buscando desde siempre, hasta encontrarse y entender que el amor no es complicación, es compañía. Es presencia, es paz, es pasión. Es esto que tú me das cada día.\n\nTú me enseñaste que el amor no tiene que doler para ser profundo, que se puede construir sin destruir, que se puede crecer en pareja, respetando lo que cada uno es.\nY por eso te amo más allá de las palabras, más allá del tiempo, más allá de lo que puedo escribir aquí.\n\nGracias por poner tu vida en la mía.\nGracias por existir, por quedarte, por elegirme todos los días.\nYo también te elijo. Hoy, mañana y siempre."
    },
    
    {
      id: 3,
      title: "Eres Mi Sueño",
      artist: "Fonseca",
      src: "/assets/music/Fonseca - Eres Mi Sueño.mp3",
      cover: "/assets/music/img/eres mi sueño.jpg",
      color: "from-purple-500 to-indigo-600",
      dedicatoria:
        "Amor de mi vida,\n\nA veces me pregunto si esto que estamos viviendo es un sueño…\nPorque sinceramente, tenerte a mi lado supera todo lo que alguna vez imaginé. Y entonces escucho \"Eres Mi Sueño\" de Fonseca, y me doy cuenta de que sí, es un sueño… pero uno hermoso, uno que no quiero despertar jamás. Porque mi realidad contigo es mil veces mejor que cualquier fantasía.\n\nTú eres ese amor que uno desea sin saber si existe.\nEres esa paz disfrazada de sonrisa, ese suspiro que se escapa sin razón cuando te pienso.\nEres mi calma y mi locura, mi aventura y mi refugio.\nMi todo.\n\nDesde que llegaste, cada día tiene una nueva luz.\nMe regalaste un motivo para soñar despierto/a, para mirar hacia adelante con ilusión.\nNo sé si el universo, el destino o la vida me premiaron contigo… pero lo agradezco cada segundo.\nPorque tú no solo entraste en mi vida, entraste en mi alma, en mis planes, en mi futuro.\n\nEres mi sueño porque encarnas todo lo que siempre quise:\nalguien que me escuche con el corazón, que me acompañe sin condiciones, que me abrace fuerte cuando el mundo duele, y que celebre conmigo cada pequeña alegría.\n\nY por eso, no quiero vivir sin ti.\nNo porque te necesite para ser feliz, sino porque mi felicidad se amplifica cuando estás tú.\nEres la razón por la que quiero ser mejor. Por ti aprendí lo que significa amar sin límites, sin miedo, sin pausa.\n\nGracias por llegar a mi vida, por quedarte, por ser ese sueño hermoso del que no quiero despertar.\nTe amo con todo lo que soy. Y si alguna vez te preguntabas si eres importante para mí…\nSolo recuerda esto: eres mi sueño… hecho realidad."
    },
    
    {
      id: 4,
      title: "Lo Mejor Que Hay En Mi Vida",
      artist: "Andrés Cepeda",
      src: "/assets/music/Andrés Cepeda - Lo Mejor Que Hay En Mi Vida - Sal De La Tierra.mp3",
      cover: "/assets/music/img/lo mejor que hay en mi vida.jpg",
      color: "from-green-500 to-teal-600",
      dedicatoria:
        "Amor mío,\n\nHay momentos en los que uno se detiene a mirar hacia atrás, a pensar en todo lo que ha vivido, y se da cuenta de que el mejor momento de su historia comenzó el día en que te conocí.\nY si hay una canción que logra decir todo lo que siento cuando te miro, cuando te abrazo, cuando te pienso… esa es \"Lo Mejor Que Hay En Mi Vida\", de Andrés Cepeda. Porque tú eres exactamente eso: lo mejor que hay en mi vida.\n\nLlegaste sin ruido, sin promesas vacías, sin máscaras.\nLlegaste con tu forma suave de estar, con esa paz que sólo tú sabes dar, con esa sonrisa que desarma todas mis defensas.\nY sin darme cuenta, me encontré confiando, sintiéndome a salvo, amando con libertad.\n\nTú me mostraste que el amor no tiene que ser drama ni dolor. Que puede ser tranquilo, sereno y fuerte al mismo tiempo.\nContigo aprendí que se puede construir un “nosotros” sin dejar de ser uno mismo.\nQue el amor no es perderse en el otro, sino encontrarse con alguien que te inspira a ser mejor, alguien que te levanta cuando te caes, que te aplaude sin envidia, que se queda sin necesidad de cadenas.\n\nHoy quiero decirte con el corazón en la mano que eres eso que nunca imaginé tener…\ny ahora no puedo ni quiero imaginar la vida sin ti.\n\nTú eres ese sueño que no sabía que tenía.\nEres la calma después de la tormenta.\nEres mi compañero/a, mi cómplice, mi refugio.\nEres mi paz y mi alegría.\n\nGracias por estar, por quedarte, por ser tú.\nGracias por mirarme con amor incluso en mis días más grises, por hacerme sentir valioso/a, por hacerme sentir en casa.\nSi alguna vez te preguntas cuánto significas para mí, solo escucha esta canción… y sabrás que no es solo una letra bonita:\nes mi verdad contigo.\n\nPorque sin dudarlo… tú eres lo mejor que hay en mi vida."
    },
    
    {
      id: 5,
      title: "Para Siempre",
      artist: "Kany García",
      src: "/assets/music/Kany García - Para Siempre.mp3",
      cover: "/assets/music/img/Kany García - Para Siempre.jpg",
      color: "from-yellow-500 to-amber-600",
      dedicatoria:
        "Mi amor,\n\nCuando pienso en todo lo que tú significas para mí, en lo que somos, en lo que hemos construido y en lo que aún soñamos… una canción me viene al corazón: “Para Siempre” de Kany García.\nPorque ahí está dicho, con dulzura y sinceridad, todo lo que quiero decirte hoy:\nQuiero estar contigo… para siempre.\n\nNo te prometo días sin dificultades, ni una vida perfecta,\npero sí te prometo estar a tu lado incluso cuando las cosas se pongan difíciles.\nPrometo elegirte cada día, con tus virtudes y tus imperfecciones, así como tú me eliges a mí.\n\nPorque tú me haces bien.\nPorque contigo he aprendido que el amor verdadero no es solo decir “te amo”, sino demostrarlo en los detalles, en los silencios, en las veces que uno se queda cuando sería más fácil irse.\nPorque contigo el mundo se siente menos pesado, más suave, más real.\nContigo soy yo, sin miedo.\n\nSé que lo nuestro es fuerte no por ser perfecto, sino por ser honesto, comprometido, profundo.\nPor eso quiero caminar contigo, sin prisa pero sin pausa.\nQuiero acompañarte en tus sueños, en tus caídas, en tus logros, en tus días grises y tus días dorados.\nQuiero seguir aprendiendo de ti, contigo, junto a ti.\n\nTú eres mi hogar,\nmi calma,\nmi impulso,\nmi lugar seguro.\nY si me preguntas qué deseo para mi vida, la respuesta es clara y sencilla:\nTú. Siempre tú. Para siempre.\n\nCon todo mi amor y mi verdad,"
    },
    
    {
      id: 6,
      title: "Llegaste Tú",
      artist: "Luis Fonsi",
      src: "/assets/music/Luis Fonsi - Llegaste Tú.mp3",
      cover: "/assets/music/img/llegastes tu.jpg",
      color: "from-red-500 to-orange-600",
      dedicatoria:
        "A veces me detengo a pensar en cómo era mi vida antes de ti… y la verdad, no lo recuerdo con claridad, porque desde que llegaste tú, todo cambió. Como dice esa canción que tanto me toca el corazón: “Llegaste Tú” de Luis Fonsi.\nY con tu llegada, todo empezó a brillar distinto.\n\nTrajiste calma donde había ruido.\nTrajiste ternura donde había dureza.\nTrajiste fe donde quedaban dudas.\nY trajiste amor… donde yo creía que ya no habría más.\n\nContigo descubrí lo que es tener un compañero de vida.\nAlguien que no solo te acompaña en los días felices, sino que se sienta a tu lado en los momentos oscuros y, con solo una mirada, te recuerda que todo va a estar bien.\n\nGracias por tocar mi alma con tu forma de amar.\nGracias por enseñarme que aún se puede creer, confiar, soñar.\nGracias por llegar cuando menos lo esperaba, pero justo cuando más te necesitaba.\n\nEres luz en mis días grises, música en mis silencios,\nsosiego en mis tormentas,\ny alegría que no se agota.\n\nSi algún día te preguntas lo que significas para mí,\nrecuerda esto:\nTú cambiaste mi mundo con solo llegar.\nY desde entonces, todo lo que soy… quiere quedarse contigo.\n\nGracias por existir.\nGracias por elegirme.\nGracias por ser tú."
    },
    
    {
      id: 7,
      title: "Nuestra Canción",
      artist: "Luister La Voz",
      src: "/assets/music/Luister La Voz - Nuestra Cancion.mp3",
      cover: "/assets/music/img/nuestra cancion.jpg",
      color: "from-sky-500 to-blue-600",
      dedicatoria:
        "Hay canciones que no solo se escuchan… se sienten, se recuerdan, se viven.\nY \"Nuestra Canción\", de Luister La Voz, es exactamente eso para mí: un espejo de lo que somos, de lo que hemos vivido, de todo lo que tú significas en mi vida.\n\nCada vez que suena, no solo pienso en nosotros…\nte siento.\nEn cada verso, en cada nota, estás tú:\ncon tu risa, con tus abrazos, con tu manera única de mirarme como si yo fuera todo.\nY me doy cuenta de que nosotros no fuimos una casualidad, fuimos destino.\nFuimos esa chispa que no se puede apagar, ese fuego que todavía arde aunque no se vea.\n\nEsa canción es testigo de todo lo que hemos sentido:\nla pasión, la ternura, la locura y también las veces que callamos más de lo que dijimos.\nY sin embargo, seguimos aquí, más reales, más fuertes, más nosotros.\n\nTú y yo dejamos huella en cada melodía.\nY aunque el mundo no entienda lo nuestro,\nyo sé lo que hemos vivido…\ny sé que mientras esta canción exista, siempre habrá un rincón donde tú y yo sigamos bailando, abrazándonos con el alma.\n\nPorque nuestra canción no es solo una pista.\nEs una historia.\nEs una promesa.\nEs un refugio.\nY tú eres la razón por la que todavía suena en mi corazón.\n\nTe amo con el mismo ritmo con el que empezó todo… y con más fuerza que nunca.\n\nContigo, siempre que suene nuestra canción,"
    },
    
    {
      id: 8,
      title: "Por Ti Seré",
      artist: "Luister La Voz",
      src: "/assets/music/Luister la voz- por-ti-seré-video-oficial.mp3",
      cover: "/assets/music/img/por ti sere.jpg",
      color: "from-emerald-500 to-green-600",
      dedicatoria:
        "Hay canciones que no solo se escuchan con los oídos… se sienten en el pecho.\nY cuando escucho “Por Ti Seré”, de Luister La Voz, sé que hay pocas formas más sinceras y reales de decirte lo que siento por ti.\n\nPorque por ti soy todo lo que puedo ser.\nPor ti he sido fuerte en mis días débiles, valiente en medio del miedo, luz cuando la oscuridad ha querido entrar.\n\nYo no solo te amo…\nte cuido, te defiendo, te sostengo, te abrazo incluso cuando no me ves.\n\nPor ti seré ese lugar seguro al que siempre puedes volver.\nEl que te escucha aunque no digas palabra.\nEl que sabe leerte en los ojos, el que reconoce tus silencios, el que camina contigo aunque el camino se ponga difícil.\n\nNo prometo ser perfecto, pero sí constante.\nNo prometo que nunca fallaré, pero sí que siempre volveré a ti con el corazón en la mano.\nPorque amarte es mi decisión diaria. Y tú… eres mi misión de vida.\n\nTú me inspiras a ser mejor.\nA dar más.\nA cuidar con ternura, a luchar con fuerza, a amar con verdad.\n\nPor ti seré todo aquello que necesites… sin pedir nada a cambio.\nPorque tú eres mi causa. Mi razón.\nMi amor eterno.\n\nY mientras exista esta canción, te juro que ahí estará mi promesa:\npor ti… siempre seré.\n\nCon todo mi ser,"
    },
    
    {
      id: 9,
      title: "Te Cuidaré",
      artist: "Luister La Voz",
      src: "/assets/music/luister-la-voz--Te cuidare.mp3",
      cover: "/assets/music/img/Te cuidare.jpg",
      color: "from-violet-500 to-purple-600",
      dedicatoria:
        "A veces no hacen falta grandes discursos para demostrar cuánto te amo…\nSolo basta con estar ahí. En silencio. En presencia. En cuidado.\nY esa es la promesa que encierra “Te Cuidaré”, de Luister La Voz.\n\nNo importa cuánto ruido haya afuera, cuántas dudas vengan o cuán difícil parezca el día.\nYo voy a cuidarte.\nA veces con palabras, otras veces solo con mi abrazo.\nPero siempre, siempre con el alma.\n\nTe cuidaré sin que lo pidas.\nTe sostendré sin que lo notes.\nSeré ese refugio que no necesita explicaciones… porque simplemente está.\nPorque tú me importas más de lo que las palabras pueden decir.\n\nTe cuidaré en los días felices, para que sean aún más bellos.\nY en los días grises, para que no los enfrentes sola/o.\nSeré tu fuerza cuando la pierdas, tu calma cuando el mundo agite tus pasos.\nSeré el amor que permanece.\n\nNo necesito razones.\nTe cuido porque amarte es proteger tu risa, tu paz, tu esencia.\nPorque cuando tú estás bien, mi mundo también lo está.\n\nY si algún día dudas de lo que siento por ti, escucha esta canción…\ny sabrás que cada verso es una promesa que te hago, hoy y siempre:\nTe cuidaré. Porque te amo. Porque eres todo para mí.\n\nCon todo mi corazón y mi protección eterna,"
    },
    
    {
      id: 10,
      title: "Ejemplo de Amor",
      artist: "Luister La Voz",
      src: "/assets/music/Luister La Voz - Ejemplo de Amor.mp3",
      cover: "/assets/music/img/ejemplo de amor.jpg",
      color: "from-rose-500 to-pink-600",
      dedicatoria:
        "Hoy no quiero solo decirte que te amo…\nQuiero decirte que te admiro.\nPorque desde que llegaste a mi vida, no solo aprendí a amar… aprendí qué es el amor verdadero.\n\nEres mi ejemplo de amor.\nTu forma de mirar, de abrazar, de comprender sin juzgar, de quedarte incluso cuando todo tiembla…\nTú me has enseñado lo que es amar con paciencia, con entrega, con verdad.\n\nA tu lado entendí que amar no es solo decir “te quiero”,\nes demostrarlo en los detalles, en los días difíciles, en el silencio compartido.\nQue el amor es elección, es presencia, es cuidado.\nY tú eres todo eso.\nTú eres amor hecho persona.\n\nEres esa calma que tanto necesitaba.\nEse “todo va a estar bien” que me devuelve el alma al cuerpo.\nEse abrazo que me reconstruye.\nEres el hogar donde mi corazón descansa.\n\nContigo descubrí una nueva versión de mí:\nmás sensible, más fuerte, más real.\nPorque amarte no solo me hizo feliz…\nme hizo mejor.\n\nGracias por mostrarme que sí existe un amor que inspira, que guía, que sana.\nGracias por no rendirte nunca.\nGracias por ser mi ejemplo, mi faro, mi fe.\n\nHoy no te dedico solo una canción…\nte dedico mi vida.\nPorque si alguien merece ese lugar sagrado, eres tú.\n\nCon la admiración más profunda y el amor más honesto,"
    },
    
    {
      id: 11,
      title: "Único",
      artist: "Joey Montana",
      src: "/assets/music/Joey Montana - Unico.mp3",
      cover: "/assets/music/img/unico.jpg",
      color: "from-cyan-500 to-blue-600",
      dedicatoria:
        "A lo largo de la vida conocemos muchas personas. Algunas se cruzan por un momento, otras se quedan un rato…\nPero tú… tú eres diferente.\nContigo no fue un cruce, fue un impacto.\nNo fuiste parte de mi historia… te volviste mi historia.\n\nDesde que llegaste todo cambió, porque contigo descubrí lo que es vivir algo único.\n\nTú no eres como nadie más.\nTienes esa forma de ser que no se aprende ni se copia:\nesa sonrisa que me calma, esa mirada que me desarma,\nese corazón que me inspira a ser mejor.\nY cuando escucho “Único” de Joey Montana, pienso en ti…\nporque nadie me ha hecho sentir como tú.\n\nNo se trata solo de lo que haces, sino de lo que provocas en mí.\nMe haces querer cuidar, proteger, construir.\nMe haces querer quedarme… para siempre.\n\nA tu lado entendí que el amor no se trata de buscar algo perfecto,\nsino de encontrar a alguien que te haga sentir que ya no necesitas buscar más.\nY tú lo eres.\nMi paz, mi emoción, mi aventura, mi refugio.\nMi persona favorita.\n\nNo quiero una historia más.\nContigo quiero *la* historia.\nLa que no se repite, la que no se olvida, la que se siente con el alma.\n\nPorque tú eres único/a.\nY lo nuestro… también lo es.\n\nTe amo como no amé antes.\nY como no amaré después.",
    },
    
    {
      id: 12,
      title: "Como Tú No Hay Dos",
      artist: "Mc Car, Maikol el Insoportable",
      src: "/assets/music/Mc Car, Maikol el Insoportable - Como Tu No Hay Dos (Video Oficial).mp3",
      cover: "/assets/music/img/como tu no hay dos.jpg",
      color: "from-orange-500 to-red-600",
      dedicatoria:
        "Hay personas que llegan y cambian tu vida.\nPero tú no solo la cambiaste…\ntú la llenaste.\n\nDesde que te tengo, sé lo que es sentirme completo.\nSé lo que es encontrar en alguien paz, risa, fuego, ternura y verdad… todo a la vez.\nY no es exageración cuando digo que como tú no hay dos.\n\nNo me hace falta mirar a otro lado, porque lo que tengo contigo no se repite, no se imita, no se compara.\nTu forma de ser, de hablar, de amar…\nTu alma, tu risa, tus silencios, tus detalles.\nTodo tú es un regalo único.\n\nEres esa persona por la que vale la pena luchar,\na la que quiero cuidar todos los días,\npor la que quiero ser mejor sin que me lo pidas.\nPorque tú me inspiras, me empujas, me elevas.\n\nA veces me pregunto cómo tuve tanta suerte de encontrarte,\ny otras veces solo agradezco en silencio porque tenerte a ti es tenerlo todo.\n\nNo sé lo que me espera el mundo mañana…\npero lo que sí sé es que no quiero imaginarlo sin ti.\n\nGracias por ser tú.\nPor ser como eres.\nPor ser esa persona única que marcó mi vida para siempre.\n\nContigo, aprendí que el amor verdadero no se busca dos veces.\nPorque cuando lo encuentras, sabes que ya no hay nadie más.\n\nY ese amor, ese único…\neres tú.\n\nCon todo lo que soy",
    },
    
    {
      id: 13,
      title: "Tu Amor Me Hace Bien",
      artist: "Marc Anthony",
      src: "/assets/music/Marc Anthony - Tu Amor Me Hace Bien (Audio).mp3",
      cover: "/assets/music/img/tu amor me hace bien.jpg",
      color: "from-indigo-500 to-violet-600",
      dedicatoria:
        "A veces me preguntan qué es lo que más valoro de estar contigo…\nY la respuesta es simple, pero inmensa:\ntu amor me hace bien.\n\nMe hace bien cuando me abrazas sin decir nada.\nCuando me miras y entiendes lo que no digo.\nCuando estás en silencio a mi lado, y ese solo hecho lo cambia todo.\n\nTu amor me ha sanado, me ha levantado en días grises,\nme ha devuelto la sonrisa cuando pensé que no volvería.\nTú eres esa energía que me impulsa a seguir.\nEsa calma que equilibra mi caos.\n\nNo sé cómo lo haces,\npero siempre logras hacerme sentir que valgo,\nque soy capaz,\nque merezco amor…\ny eso, amor mío, es lo más hermoso que alguien ha hecho por mí.\n\nNo te amo solo por lo que eres…\nte amo por lo que soy cuando estoy contigo:\nmás feliz, más fuerte, más yo.\n\nY si algún día dudas de lo que significas para mí,\nrecuerda esto:\nTu amor no solo me hace feliz…\nme hace bien.\nProfundamente bien.\n\nGracias por existir.\nGracias por quedarte.\nGracias por amar así.\n\nCon todo lo que tengo y todo lo que soy"
    },
    
    {
      id: 14,
      title: "Sabrás",
      artist: "Herencia de Timbiquí",
      src: "/assets/music/Sabrás, Herencia de Timbiquí.mp3",
      cover: "/assets/music/img/herencia de timbiqui.jpg",
      color: "from-teal-500 to-emerald-600",
      dedicatoria:
        "Amor,\n\nHoy quiero abrir mi corazón como nunca antes y dejarte estas palabras inspiradas en una canción que me toca el alma: \"Sabrás\" de Herencia de Timbiquí.\nPorque a veces siento que todo lo que quiero decirte ya está ahí, en esa melodía que habla de un amor que quizás no siempre se dice en voz alta, pero que se siente hasta los huesos.\n\nSabrás cuánto te amo...\ncuando recuerdes mis silencios llenos de ternura,\ncuando pienses en cómo te he mirado, aún cuando no lo notaste,\ncuando sientas que cada pequeño gesto mío, por más simple que parezca, siempre fue para ti.\n\nSabrás lo importante que eres para mí\ncuando un día te des cuenta de todo lo que cambió en mí desde que te conocí.\nDe cómo aprendí a ser más paciente, más fuerte, más soñador/a… solo por el hecho de tenerte en mi vida.\nContigo me hice mejor sin que me lo pidieras.\n\nSi alguna vez dudaste de cuánto te amo,\npiensa en todas las veces que me quedé en silencio… no porque no supiera qué decir, sino porque lo que siento por ti es tan grande, que ni las palabras le hacen justicia.\n\nPorque tú eres esa persona por la que me la juego todo.\nEres el motivo detrás de mi sonrisa, la calma después del caos, la razón por la que creo en lo bonito, en lo real, en lo eterno.\n\nTal vez no siempre te lo diga como en las películas, pero si escuchas con el corazón, sabrás…\nSabrás que te amo con el alma.\nSabrás que mi vida es otra desde que estás tú.\nSabrás que, pase lo que pase, dejarás en mí una huella que nadie podrá borrar jamás.\n\nGracias por existir.\nGracias por enseñarme que el amor también se canta desde el alma.\nY si algún día no estoy cerca, solo escucha esta canción... y sabrás."
    },
    
    {
      id: 15,
      title: "Eres Todo",
      artist: "Iván Villazón y Iván Zuleta",
      src: "/assets/music/iván villazón -- iván zuleta- eres todo.mp3",
      cover: "/assets/music/img/eres todo.jpg",
      color: "from-indigo-500 to-violet-600",
      dedicatoria:
        "Amor de mi vida,\n\nHay canciones que uno no solo canta… también las siente. Y \"Eres Todo\" es una de esas canciones que me hacen pensar en ti desde la primera nota.\nPorque no hay una sola palabra en esa letra que no me recuerde lo que tú significas para mí.\n\nTú eres eso que soñé sin saberlo.\nLlegaste a mi vida cuando menos lo esperaba, y de repente todo empezó a tener más sentido.\nContigo aprendí que el amor verdadero no se mide en promesas, sino en hechos, en miradas, en estar ahí... siempre.\n\nEres todo lo que quiero, todo lo que necesito, todo lo que me inspira.\nEres la persona a la que quiero cuidar con el alma,\ncon la que quiero compartir mis días, mis logros, mis miedos, mis sueños.\n\nSé que la vida no es perfecta, pero a tu lado todo se vuelve más llevadero, más bonito, más lleno de esperanza.\nTú eres mi razón para creer en el amor, ese amor que se construye con respeto, con paciencia, con alegría… con música y abrazos sin razón.\n\nA veces no sé cómo expresar lo que siento por ti, pero esta canción me ayuda:\nEres todo.\nMi calma, mi alegría, mi refugio, mi motivación.\nEres el corazón de mis días.\nY si un día dudas, escucha esa canción… y sabrás exactamente lo que siento.\n\nGracias por ser tú.\nGracias por dejarme amarte.\nGracias por ser mi todo."
    },
    
  ])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageHeader
        title="Nuestras Canciones"
        description="La banda sonora de nuestro amor, cada melodía un recuerdo especial"
      />

      <MusicPlayer initialSongs={songs} />

      <div className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">El Poder de la Música en Nuestra Historia</h2>
        <p className="text-gray-700 mb-4">
          La música tiene el poder mágico de transportarnos en el tiempo, de hacernos revivir momentos especiales con
          solo escuchar las primeras notas de una canción. Cada melodía en esta playlist es un capítulo de nuestra
          historia de amor.
        </p>
        <p className="text-gray-700 mb-4">
          Algunas canciones nos recuerdan nuestros primeros momentos juntos, otras nos transportan a celebraciones
          especiales, y algunas simplemente se convirtieron en "nuestras" porque estaban sonando en momentos cotidianos
          que, sin saberlo, se volverían recuerdos preciosos.
        </p>
        <p className="text-gray-700">
          Esta colección musical es un tesoro que irá creciendo con el tiempo, añadiendo nuevas melodías que marcarán
          los futuros capítulos de nuestro amor. Cada canción es una dedicatoria, un mensaje, una promesa de amor
          eterno.
        </p>
      </div>
    </div>
  )
}
