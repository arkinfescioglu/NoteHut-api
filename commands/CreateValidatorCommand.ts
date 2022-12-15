import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import { string } from '@ioc:Adonis/Core/Helpers';
import { join } from 'path';

export default class CreateValidatorCommand extends BaseCommand {
  @args.string()
  public name: string
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:validator'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    let name = this.setNameVariable(this.name);
    let newName = `${name}Validator`;
    this.generator
      .addFile(newName)
      .appRoot(this.application.appRoot)
      .destinationDir('app/Validators')
      .useMustache()
      .stub(join(__dirname, `./templates/validator.txt`))
      .apply({
        name: newName,
      });
    await this.generator.run();
    this.logger.info('Validator Oluşturuldu.');
  }


  protected setNameVariable(name: string): string {
    name = string.pascalCase(name);
    name = name.replace("Validator", "");
    name = name.replace("validator", "");
    return name;
  }
}
