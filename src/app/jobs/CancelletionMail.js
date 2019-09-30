import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/mail';

class CancelletionMail {

    get key() {

        return 'CancelletionMail';
    }
    async handle({ data }) {

        const { appointment } = data;
        console.log('A fila executou');
        console.log("DATA"+ JSON.stringify(appointment.provider.name));
        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: appointment.data//format(parseISO(appointment.data), "'dia' dd 'de' MMMM', às' H:mm,'h' ", { locale: pt })
            }
        });
    }

}

export default new CancelletionMail();