import { BaseCommand, flags } from '@adonisjs/core/build/standalone'
import { join } from 'path';
import { string } from '@ioc:Adonis/Core/Helpers';

interface ICreateFileInit {
  name: string;
  addFile: any;
  destinationDir: string;
  stubName: string;
  apply: any;
}

export default class CreateModuleCommand extends BaseCommand {

  @flags.string()
  public name: string;

  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:module'


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

    let { name, prompt } = this;
    name = this.setNameVariable(name);

    //makes database model
    //Veritabanı modeli oluşturur.
    const makeModel = await prompt.confirm('Model oluşturulsun mu?');
    if (makeModel) await this.makeModel(name);

    //makes database migration
    //veritabanı migration'ı oluşturur.
    const makeMigration = await prompt.confirm('Migration oluşturulsun mu?');
    if (makeMigration) await this.makeMigration(name);

    //makes repository.
    //Repository sınıfını oluşturur.
    const makeRepository = await prompt.confirm('Repository oluşturulsun mu?');
    if (makeRepository) await this.makeRepository(name);

    //makes service.
    //Servis sınıfını oluşturur.
    const makeServices = await prompt.confirm('Servis oluşturulsun mu?');
    if (makeServices) await this.makeServices(name);

    //makse controller.
    //controller sınıfını oluştur.
    const makeController = await prompt.confirm('Controller oluşturulsun mu?');
    if (makeController) await this.makeController(name);

  }

  protected async makeController(name: any) {
    this.logger.info('Controller Oluşturma Başladı.');
    let newName = `${string.pluralize(name)}Controller`;
    await this.createFile({
      name: newName,
      addFile: newName,
      destinationDir: 'app/Controllers/Http',
      stubName: "controller",
      apply: {
        name: newName,
        serviceName: `${name}Service`
      }
    });
    this.logger.info('Controller Oluşturuldu.');
  }

  protected async makeServices(name: any) {
    this.logger.info('Servis Oluşturma Başladı.');
    let newName = `${name}Service`;
    await this.createFile({
      name: newName,
      addFile: newName,
      destinationDir: 'app/Services',
      stubName: "service",
      apply: {
        name: newName,
        repositoryName: `${name}Repository`
      }
    });
    this.logger.info('Servis Oluşturuldu.');
  }

  protected async makeRepository(name: any) {
    this.logger.info('Repository Oluşturma Başladı.');
    let newName = `${name}Repository`;
    await this.createFile({
      name: newName,
      addFile: newName,
      destinationDir: 'app/Repositories',
      stubName: "repository",
      apply: {
        name: newName,
        modelName: name
      }
    });
    this.logger.info('Repository Oluşturuldu.');
  }

  protected async makeModel(name: any) {
    this.logger.info('Model Oluşturma Başladı.');
    await this.createFile({
      name: name,
      addFile: name,
      destinationDir: 'app/Models',
      stubName: "model",
      apply: {
        name: name,
      }
    });
    this.logger.info('Model Oluşturuldu.');
  }

  protected async makeMigration(name: string) {
    this.logger.info('Migration Oluşturma Başladı.');
    name = string.snakeCase(name);
    await this.createFile({
      name: name,
      addFile: `${Date.now()}_create_${name}_table`,
      destinationDir: 'database/migrations',
      stubName: "migration",
      apply: {
        name: name,
        tableName: string.pluralize(name)
      }
    });
    this.logger.info('Migration Oluşturuldu.');
  }

  protected setNameVariable(name: string): string {
    name = string.pascalCase(name);
    name = name.replace("Controller", "");
    name = name.replace("Service", "");
    name = name.replace("Services", "");
    name = name.replace("Repository", "");
    return name;
  }

  protected async createFile(init: ICreateFileInit) {
    let {
      addFile,
      destinationDir,
      stubName,
      apply
    } = init;
    this.generator
      .addFile(addFile)
      .appRoot(this.application.appRoot)
      .destinationDir(destinationDir)
      .useMustache()
      .stub(join(__dirname, `./templates/${stubName}.txt`))
      .apply(apply);
    await this.generator.run();
  }
}
