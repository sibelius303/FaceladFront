export const ROUTER_PATH = {
    LOGIN: "/login",
    HOME: "/home",
    CLIENT: "/client",
    REGISTER: '/register',
    API: {
        USER: '/api/auth/user',
        CUSTOMER: '/api/customer'
    }
} as const;

export const COOKIE_NAME: { [key: string]: string } = {
    USER: "localhost--user"
};

export const LOGIN: string = 'LOGIN';
export const LOGOUT: string = 'LOGOUT';
export const REGISTER: string = 'REGISTER';
export const FORGOT_PASSW: string = 'FORGOT_PASSWORD'
export const CREATE_CUSTOMER: string = 'CREATE_CUSTOMER';

export const COUNTRY: { id: string; value: string }[] = [
    { id: "AR", value: "Argentina" },
    { id: "CL", value: "Chile" },
    { id: "CO", value: "Colombia" },
    { id: "ES", value: "España" },
    { id: "US", value: "Estados Unidos" },
    { id: "MX", value: "Mexico" },
    { id: "PE", value: "Perú" },
    { id: "UK", value: "Reino Unido" },
    { id: "UR", value: "Uruguay" },
    { id: "VE", value: "Venezuela" }
];

export const LENGUAJE: { id: string; value: string }[] = [
    { id: "EN", value: "Ingles" },
    { id: "ES", value: "Español" },
];

export const SERVICE_MODEL = [
    {
        id: "Servicios de TI", value: "Servicios de TI", servicios: [
            { id: "Soporte TI", value: "Soporte TI" },
            { id: "Desarrollo Mobile", value: "Desarrollo Mobile" },
            { id: "Desarrollo CMS", value: "Desarrollo CMS" },
            { id: "Desarrolo de Software", value: "Desarrolo de Software" },
            { id: "Diseño Web", value: "Diseño Web" },
        ]
    },
    { id: "Servicios de Hosting", value: "Servicios de Hosting", servicios: [
        { id: "Hosting", value: "Hosting" },
        { id: "Dominio", value: "Dominio" },
    ] },
    { id: "Servicios de Marketing", value: "Servicios de Marketing", servicios: [
        { id: "Marketing Digital", value: "Marketing Digital" },
        { id: "Community Manager", value: "Community Manager" },
        { id: "Consultoria", value: "Consultoria" },
        { id: "Correos corporativos", value: "Correos corporativos" },
    ] },
    { id: "Servicios de Diseño", value: "Servicios de Diseño" , servicios:[
        { id: "Diseño Gráfico", value: "Diseño Gráfico" },
    ]},
    { id: "Otros Servicios", value: "Otros Servicios", servicios:[
        { id: "Otros", value: "Otros" }
    ] }
]

export const MODALITY = [
    { id: "1", value: "Unico" },
    { id: "2", value: "Mensual" },
    { id: "3", value: "Trimestral" },
    { id: "4", value: "Semestral" },
    { id: "5", value: "Anual" }
]