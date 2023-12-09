"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ru = {
  "CMEditViewCopyLocale.copy-failure": "Не удалось скопировать перевод",
  "CMEditViewCopyLocale.copy-success": "Перевод скопирована",
  "CMEditViewCopyLocale.copy-text": "Заполните данные из другого языка",
  "CMEditViewCopyLocale.submit-text": "Да, заполнить",
  "CMListView.popover.display-locales.label": "Отображать переведенные языки",
  "CheckboxConfirmation.Modal.body": "Вы хотите выключить это?",
  "CheckboxConfirmation.Modal.button-confirm": "Да, выключить",
  "CheckboxConfirmation.Modal.content": "Отключение перевода приведет к удалению всего вашего контента, кроме того, который связан с вашим языком по умолчанию (если вообще он существует).",
  "Field.localized": "Это значение уникально для выбранного перевода",
  "Field.not-localized": "Это значение является общим для всех переводов",
  "Settings.list.actions.add": "Добавить новый перевод",
  "Settings.list.actions.delete": "Удалить перевод",
  "Settings.list.actions.deleteAdditionalInfos": "Это приведет к удалению активных версий перевода <em>(из плагина интернационализации)</em>",
  "Settings.list.actions.edit": "Редактировать перевод",
  "Settings.list.actions.publishAdditionalInfos": "При этом будут опубликованы активные языковые версии <em>(из плагина Интернационализация)</em>",
  "Settings.list.actions.unpublishAdditionalInfos": "При этом будут скрыты (сняты с публикации) активные языковые версии <em>(из плагина Интернационализация)</em>",
  "Settings.list.description": "Настройте параметры для плагина интернационализации",
  "Settings.list.empty.description": "Это необычное поведение, означающее, что всё-таки вы изменили базу данных вручную. Убедитесь, что базе данных сохранён хотя бы один перевод, чтобы иметь возможность правильно использовать Strapi.",
  "Settings.list.empty.title": "Переводов нет.",
  "Settings.locales.default": "По умолчанию",
  "Settings.locales.list.sort.default": "Сортировать переводы по умолчанию",
  "Settings.locales.list.sort.displayName": "Сортировать по отображаемому имени",
  "Settings.locales.list.sort.id": "Сортировать по ID",
  "Settings.locales.modal.advanced": "Расширенные настройки",
  "Settings.locales.modal.advanced.setAsDefault": "Установить в качестве перевода по умолчанию",
  "Settings.locales.modal.advanced.setAsDefault.hint": "Необходим один перевод по умолчанию, вы можете изменить его выбрав другой перевод",
  "Settings.locales.modal.advanced.settings": "Настройки",
  "Settings.locales.modal.base": "Основные настройки",
  "Settings.locales.modal.create.alreadyExist": "Этот перевод уже существует",
  "Settings.locales.modal.create.defaultLocales.loading": "Загрузка доступных переводов...",
  "Settings.locales.modal.create.success": "Перевод успешно добавлен",
  "Settings.locales.modal.create.tab.label": "Переключение между основными настройками этого плагина и расширенными настройками",
  "Settings.locales.modal.delete.confirm": "Да, удалить",
  "Settings.locales.modal.delete.message": "Удаление этого перевода приведет к удалению всего связанного с ним содержимого. Если вы хотите сохранить какой-то контент, обязательно сначала перенесите его в другой язык (перераспределите в другой перевод).",
  "Settings.locales.modal.delete.secondMessage": "Вы хотите удалить этот перевод?",
  "Settings.locales.modal.delete.success": "Перевод успешно удалён",
  "Settings.locales.modal.edit.confirmation": "Готово!",
  "Settings.locales.modal.edit.locales.label": "Переводы",
  "Settings.locales.modal.edit.success": "Перевод успешно отредактирован",
  "Settings.locales.modal.edit.tab.label": "Переключение между основными настройками этого плагина и расширенными настройками",
  "Settings.locales.modal.locales.displayName": "Отображаемое имя перевода",
  "Settings.locales.modal.locales.displayName.description": "Перевод будет отображаться под этим именем в панели администратора",
  "Settings.locales.modal.locales.displayName.error": "Отображаемое имя перевода может содержать не более 50 символов.",
  "Settings.locales.modal.locales.label": "Переводы",
  "Settings.locales.modal.locales.loaded": "Переводы были успешно загружены.",
  "Settings.locales.modal.title": "Настройки",
  "Settings.locales.row.default-locale": "Перевод по умолчанию",
  "Settings.locales.row.displayName": "Отображаемое имя",
  "Settings.locales.row.id": "ID",
  "Settings.permissions.loading": "Разрешения на загрузку",
  "Settings.permissions.read.denied.description": "Чтобы иметь возможность прочитать это, обязательно свяжитесь с администратором вашей системы.",
  "Settings.permissions.read.denied.title": "У вас нет прав доступа к этому контенту.",
  "actions.select-locale": "Выбрать перевод",
  "components.Select.locales.not-available": "Нет доступного контента",
  "plugin.description.long": "Этот плагин позволяет создавать, читать и обновлять контент (словом, производить всевозможные действия с контентом) на разных языках, как из панели администратора, так и через API.",
  "plugin.description.short": "Этот плагин позволяет создавать, читать и обновлять контент на разных языках, как из панели администратора, так и через API.",
  "plugin.name": "Интернационализация",
  "plugin.schema.i18n.ensure-unique-localization": "Уникальные поля должны быть переведены",
  "plugin.schema.i18n.localized.description-content-type": "Позволяет перевести запись на разные языки",
  "plugin.schema.i18n.localized.description-field": "Поле может иметь разные значения на каждом языке",
  "plugin.schema.i18n.localized.label-content-type": "Интернационализация",
  "plugin.schema.i18n.localized.label-field": "Включить перевод для этого поля"
};
exports.default = ru;
//# sourceMappingURL=ru-31eda400.js.map
