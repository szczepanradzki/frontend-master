import {gql} from "apollo-boost";

export const fullMachineSpec = gql`
    query AllMachines($name: String) {
        machines(where: { name: $name }) {
            id
            name
            Opis {
                short_description
                full_description {
                    url
                }
            }
            price
            Advance
            automatyzacjas {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            controllers {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                default
                opcje_softwares {
                    id
                    name
                    Opis {
                        short_description
                        full_description {
                            url
                        }
                    }
                    price
                    default
                }
            }
            column_height_advs {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            wiories {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            blums {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            renishaws {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            metrols {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            wrzecionas {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
            wysokosc_kolumny_standards {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }

            tables {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
                opcje_do_stolows {
                    id
                    name
                    Opis {
                        short_description
                        full_description {
                            url
                        }
                    }
                    price
                    default
                }
            }
            pozostales {
                id
                name
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
                price
                default
            }
        }
    }
`;
