import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import {
  ProcessingMemeOperator,
  ProcessingMemeOperatorToken,
} from '@controller/operations/meme/ProcessingMemeOperator'
import { ProcessingMemeSerializer } from '@controller/serializers/meme/ProcessingMemeSerializer'
import { SQSEvent } from 'aws-lambda'

// npx sls invoke local -f ProcessingMemeHandler -p src/4-framework/functions/modules/meme/ProcessingMeme/mock.json --stage dev
export const handler = async (event: SQSEvent): Promise<void> => {
  try {
    const operator = container.get<ProcessingMemeOperator>(
      ProcessingMemeOperatorToken
    )

    for (let i = 0; i < event.Records.length; i += 1) {
      const input = new ProcessingMemeSerializer(
        JSON.parse(event.Records[i].body ?? '{}')
      )

      await operator.run(input)
    }
  } catch (err) {
    console.log(err)
  }
}
