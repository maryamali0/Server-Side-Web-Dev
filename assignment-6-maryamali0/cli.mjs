import {Command} from 'commander';
import axios from 'axios';

const program = new Command();
program.version('0.0.1');

program
    .command('icecream <flavor>')
    .description('mentions users likes an ice cream flavor')
        .option('-t, --my-topping <myTopping>', 'The topping the user would like on their ice cream')
        .option('-s, --scoop-quantity <scoopQuantity>', 'The number of scoops the user likes')
        .action((flavor, cmd) => {
            console.log(cmd);
            if (cmd.myTopping) {
                flavor += ` with ${cmd.myTopping}`;
            }

            if (cmd.scoopQuantity) {
                flavor += ` in ${cmd.scoopQuantity} scoops`;
            }
            console.log(`You like ${flavor} ice cream`);
    })

program
    .command('getcontent <url>')
    .description('get html content from url')
    .action((url, cmd) => {
        console.log(cmd, url);
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

program.parse(process.argv);